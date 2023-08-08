import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../../pages/Home';
import InvoiceArchive from '../../pages/InvoiceArchive';
import AddInvoice from '../../pages/AddInvoice';
import AddCompany from '../../pages/AddCompany';
import TemplateArchive from '../templates/TemplateArchive';
import TemplateView from '../templates/TemplateView';
import PreviewInvoice from '../../pages/PreviewInvoice';
import ConfirmSent from '../../pages/ConfirmSent';
import IncomeReport from '../../pages/IncomeReport';

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
                          tabBarIcon: ({ focused, color, size }) => null,
                          tabBarLabel: ({ focused, color, position, children }) => null,
                          tabBarButton: (props) => null // use a custom component to replace the default tab button
                        }}
                />
                <Tab.Screen 
                        name={"Archive"} 
                        component={InvoiceArchive}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                            <Ionicons name="list-outline" color={color} size={20} />
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
                <Tab.Screen 
                        name={"Report"} 
                        component={IncomeReport}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                            <Ionicons name="bar-chart-outline" color={color} size={20} />
                            ),
                            tabBarStyle: {

                            }
                        }}
                />
          <Tab.Screen 
            name={"Templates"} 
            component={TemplateArchive}
            options={{
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"TemplateView"} 
            component={TemplateView}
            options={{
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"AddCompany"} 
            component={AddCompany}
            options={{
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"AddInvoice"} 
            component={AddInvoice}
            options={{
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"PreviewInvoice"} 
            component={PreviewInvoice}
            options={{
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"ConfirmSent"} 
            component={ConfirmSent}
            options={{
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"IncomeReport"} 
            component={IncomeReport}
            options={{
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;