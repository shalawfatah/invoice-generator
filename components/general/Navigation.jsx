import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../../pages/Home';
import InvoiceArchive from '../../pages/InvoiceArchive';
import AddInvoice from '../../pages/AddInvoice';
import AddCompany from '../../pages/AddCompany';

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                tabBarActiveTintColor: '#2b3252',
                }}
                >
                <Tab.Screen 
                        name={"Home"} 
                        component={Home}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home-outline" color={color} size={20} />
                            ),
                            tabBarStyle: {

                            }
                        }}
                />
                <Tab.Screen 
                        name={"Invoices"} 
                        component={InvoiceArchive}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                            <Ionicons name="mail-open-outline" color={color} size={20} />
                            ),
                            tabBarStyle: {

                            }
                        }}
                />
                <Tab.Screen 
                        name={"Add Invoice"} 
                        component={AddInvoice}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                            <Ionicons name="create-outline" color={color} size={20} />
                            ),
                            tabBarStyle: {

                            }
                        }}
                />
                    <Tab.Screen 
                        name={"Add Company"} 
                        component={AddCompany}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                            <Ionicons name="business-outline" color={color} size={20} />
                            ),
                            tabBarStyle: {

                            }
                        }}
                />
          </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;