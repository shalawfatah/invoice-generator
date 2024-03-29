import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";
import InvoiceBtn from "../components/general/Button";
import { useNavigation } from "@react-navigation/native";
import { calc_amount } from "../util_functions/calc_amount";
import Border from "../components/general/Border";
import { supabase } from "../lib/supabase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useAtom } from "jotai";
import {
  companiesAtom,
  profileAtom,
  templateAtom,
  userAtom,
} from "../lib/store";

const AddEstimate = () => {
  const [user] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useAtom(profileAtom);
  const [template, setTemplate] = useAtom(templateAtom);

  const [number, setNumber] = useState("1");

  const invoice_number = async () => {
    const { data, error } = await supabase.rpc(
      "get_last_invoice_document_number_for_user",
      {
        p_user_id: user.id,
        p_type: "estimate",
      },
    );
    if (error) {
      console.log(error);
    }
    if (data) {
      const n = JSON.stringify(data[0].document_number + 1);
      setNumber(n);
    } else {
      setNumber("1");
    }
  };

  const checkUser = async () => {
    const { data, error } = await supabase
      .from("profile")
      .select()
      .eq("email", user.email)
      .single();
    if (error) {
      console.log(error);
    } else {
      setProfile(data);
      setTemplate(data.template);
    }
    setIsLoading(false);
  };

  const [text, setText] = useState("");
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState(1);
  const [note, setNote] = useState("");

  // COMPANIES
  const [companies, setCompanies] = useAtom(companiesAtom);
  const fetch_companies = async () => {
    let { data: all_companies, error } = await supabase
      .from("companies")
      .select()
      .eq("user_id", user.id);
    setChosen(all_companies[0]);
    setCompanies(all_companies);
  };

  const fetchData = async () => {
    try {
      await checkUser();
      await fetch_companies();
      await invoice_number();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [template]);

  const filtered_companies = companies?.filter((item) =>
    item.company_name.includes(text),
  );
  const [chosen, setChosen] = useState(null);
  // END COMPANIES

  const addTask = () => {
    const newTask = {
      id: counter,
      quantity: 1,
      tax: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const updateTask = (id, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task,
      ),
    );
  };

  const amount = calc_amount(tasks);

  const subtotal = amount.subtotal;
  const tax = amount.taxAmount.toFixed(2);
  const total = amount.total.toFixed(2);

  const prevEstimate = async () => {
    if (typeof chosen === "undefined" || chosen === null) {
      Alert.alert("Please add or select a client");
    } else if (tasks.length === 0) {
      Alert.alert("Please add at least one task");
    } else {
      const choice =
        typeof chosen !== "object" ? await JSON.parse(chosen) : chosen;
      await navigation.navigate("PreviewEstimate", {
        tasks,
        subtotal,
        tax,
        total,
        choice,
        note,
        user,
        profile,
        number,
      });
    }
  };
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={MD2Colors.black}
          className="mx-1 p-8"
        />
      ) : (
        <View>
          <ScrollView className="p-2 bg-white">
            <View className="relative">
              <TextInput
                label="Search For Clients"
                value={text}
                placeholder="Type client name to send invoice to"
                onChangeText={(text) => setText(text)}
                backgroundColor="#FFFFFF"
              />
              <TouchableOpacity
                className="absolute right-0 top-4"
                onPress={() => navigation.navigate("AddCompany")}
              >
                <Ionicons
                  style={{ textAlign: "center" }}
                  name="add-circle"
                  size={24}
                  color={"#2b3252"}
                />
              </TouchableOpacity>
            </View>
            {filtered_companies?.length === 0 ? (
              <View className="flex flex-row items-center justify-center my-2">
                <Text className="">If not found. Tap</Text>
                <TouchableOpacity
                  className="mx-1"
                  onPress={() => navigation.navigate("AddCompany")}
                >
                  <Ionicons name="add-circle" size={24} color={"#2b3252"} />
                </TouchableOpacity>
                <Text>to add clients</Text>
              </View>
            ) : (
              <Picker
                selectedValue={chosen}
                style={{ height: "auto", width: "auto" }}
                onValueChange={(chosen, index) => setChosen(chosen)}
              >
                {filtered_companies?.map((item) => {
                  return (
                    <Picker.Item
                      key={item.id}
                      label={item.company_name}
                      value={JSON.stringify(item)}
                    />
                  );
                })}
              </Picker>
            )}
            <View className="bg-[#f5f5f5] px-2">
              <View>
                {tasks.map((task) => (
                  <View key={task.id}>
                    <TextInput
                      style={{}}
                      label="Task description"
                      value={task.text}
                      multiline={true}
                      onChangeText={(text) => updateTask(task.id, "text", text)}
                      backgroundColor="#f5f5f5"
                    />
                    <TextInput
                      style={{ width: "%50" }}
                      label="Task amount"
                      value={task.number}
                      onChangeText={(number) =>
                        updateTask(task.id, "number", number)
                      }
                      keyboardType="numeric"
                      backgroundColor="#f5f5f5"
                    />
                    <View className="flex flex-row items-center justify-between my-2 mx-4">
                      <View>
                        <Text className="font-bold text-md">Qunatity</Text>
                      </View>
                      <View className="flex flex-row items-center">
                        <TouchableOpacity
                          onPress={() =>
                            updateTask(
                              task.id,
                              "quantity",
                              Math.max(task.quantity - 1, 1),
                            )
                          }
                        >
                          <Ionicons
                            name="remove-circle-outline"
                            size={24}
                            color={"#2b3252"}
                          />
                        </TouchableOpacity>
                        <Text className="mx-2 font-bold">{task.quantity}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            updateTask(task.id, "quantity", task.quantity + 1)
                          }
                        >
                          <Ionicons
                            name="add-circle-outline"
                            size={24}
                            color={"#2b3252"}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View className="flex flex-row items-center justify-between my-2 mx-4">
                      <View>
                        <Text className="font-bold text-md">GST</Text>
                      </View>
                      <Switch
                        trackColor={{ false: "#808080", true: "#2b3252" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#808080"
                        onValueChange={() =>
                          updateTask(task.id, "tax", !task.tax)
                        }
                        value={task.tax}
                      />
                    </View>
                  </View>
                ))}
              </View>
              <View className="my-2">
                <InvoiceBtn
                  icon="add-circle-outline"
                  mode="contained"
                  text={tasks.length > 0 ? "Add another task" : "Add a task"}
                  duty={addTask}
                />
              </View>
            </View>
            <View>
              <TextInput
                style={{}}
                label="Estimate Number"
                keyboardType="numeric"
                placeholder="What is the estimate number"
                value={number}
                onChangeText={(number) => setNumber(number)}
                backgroundColor="white"
              />
            </View>
            <TextInput
              style={{}}
              label="Additional Notes"
              placeholder="Write a note"
              value={note}
              onChangeText={(note) => setNote(note)}
              backgroundColor="white"
            />
            <View className="flex flex-row items-center justify-between m-4">
              <Text className="font-bold">Subtotal</Text>
              <Text className="bg-[#81F3FA] text-[#4847A0] px-4 py-2 min-w-[150px] text-center">
                {isNaN(subtotal) ? null : `$${subtotal}`}
              </Text>
            </View>
            <Border />
            <View className="flex flex-row items-center justify-between m-4">
              <Text className="font-bold">Tax</Text>
              <Text className="bg-[#81F3FA] text-[#4847A0] px-4 py-2 min-w-[150px] text-center">
                {isNaN(tax) ? null : `$${tax}`}
              </Text>
            </View>
            <Border />
            <View className="flex flex-row items-center justify-between m-4">
              <Text className="font-bold">Total</Text>
              <Text className="bg-[#81F3FA] text-[#4847A0] px-4 py-2 font-bold min-w-[150px] text-center">
                {isNaN(total) ? null : `$${total}`}
              </Text>
            </View>
            <InvoiceBtn
              duty={prevEstimate}
              icon="add-circle-outline"
              text="View"
            />
            <View className="my-12"></View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default AddEstimate;
