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
import SingleInvoice from '../../pages/SingleInvoice';
import EditProfile from '../../pages/EditProfile';
import AddEstimate from '../../pages/AddEstimate';
import PreviewEstimate from '../../pages/PreviewEstimate';
import ClientArchive from '../../pages/ClientArchive';
import ClientUpdate from '../../pages/ClientUpdate';
import CompanyRegister from '../launch/CompanyRegister';
import SubscribePackages from '../launch/SubscribePackages';
import PaySubscription from '../launch/PaySubscription';
import EstimateArchive from '../../pages/EstimateArchive';

const Tab = createBottomTabNavigator();

const originalWarn = console.warn
console.warn = (message, ...args) => {
if (message.startsWith('@supabase/gotrue-js')) return
originalWarn(message, ...args)
}

const Navigation = () => {
    return (
        <NavigationContainer>
          <Tab.Navigator
                screenOptions={{
                tabBarActiveTintColor: '#2b3252',
                tabBarInactiveTintColor: 'gray',
                }}
                >
                  <Tab.Screen 
                      name={"Archive"} 
                      component={InvoiceArchive}
                      options={{
                        title: "Invoice Archive",
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="reader-outline" color={color} size={20} />
                        ),
                        tabBarStyle: {}
                    }}
                    />
                  <Tab.Screen 
                      name={"EstimateArchive"} 
                      component={EstimateArchive}
                      options={{
                        title: "Estimate Archive",
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="receipt-outline" color={color} size={20} />
                        ),
                        tabBarStyle: {}
                    }}
                    />
                  <Tab.Screen 
                      name={"Account"} 
                      component={Home}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" color={color} size={20} />
                        ),
                        tabBarStyle: {}
                    }}
                  />
                <Tab.Screen 
                    name={"Add Invoice"} 
                    component={AddInvoice}
                    options={{
                      tabBarIcon: ({ focused, color, size }) => null,
                      tabBarLabel: ({ focused, color, position, children }) => null,
                      tabBarButton: (props) => null // use a custom component to replace the default tab button
                    }}
                  />
                  <Tab.Screen 
                    name={"Add Estimate"} 
                    component={AddEstimate}
                    options={{
                      tabBarIcon: ({ focused, color, size }) => null,
                      tabBarLabel: ({ focused, color, position, children }) => null,
                      tabBarButton: (props) => null // use a custom component to replace the default tab button
                    }}
                  />
                  <Tab.Screen 
                  name={"Company Register"} 
                  component={CompanyRegister}
                  options={{
                    title: "Register Company",
                    tabBarIcon: ({ focused, color, size }) => null,
                    tabBarLabel: ({ focused, color, position, children }) => null,
                    tabBarButton: (props) => null // use a custom component to replace the default tab button
                  }}
                />
                <Tab.Screen 
                  name={"Subscribe Packages"} 
                  component={SubscribePackages}
                  options={{
                    title: "Subscription",
                    tabBarIcon: ({ focused, color, size }) => null,
                    tabBarLabel: ({ focused, color, position, children }) => null,
                    tabBarButton: (props) => null // use a custom component to replace the default tab button
                  }}
                />
                <Tab.Screen 
                  name={"Pay for Subscription"} 
                  component={PaySubscription}
                  options={{
                    tabBarIcon: ({ focused, color, size }) => null,
                    tabBarLabel: ({ focused, color, position, children }) => null,
                    tabBarButton: (props) => null // use a custom component to replace the default tab button
                  }}
                />
                <Tab.Screen 
                        name={"Report"} 
                        component={IncomeReport}
                        options={{
                            title: "Income Reports",
                            tabBarIcon: ({ color, size }) => (
                            <Ionicons name="bar-chart-outline" color={color} size={20} />
                            ),
                            tabBarStyle: {}
                        }}
                />
          <Tab.Screen 
            name={"Templates"} 
            component={TemplateArchive}
            options={{
              title: "Choose Templates",
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"TemplateView"} 
            component={TemplateView}
            options={{
              title: "View Template",
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"AddCompany"} 
            component={AddCompany}
            options={{
              title: "Add Clients",
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"PreviewInvoice"} 
            component={PreviewInvoice}
            options={{
              title: "Invoice Preview",
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"PreviewEstimate"} 
            component={PreviewEstimate}
            options={{
              title: "Preview Estimate",
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"ConfirmSent"} 
            component={ConfirmSent}
            options={{
              title: "Confirmation",
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"SingleInvoice"} 
            component={SingleInvoice}
            options={{
              title: "Invoice",
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"EditProfile"} 
            component={EditProfile}
            options={{
              title: "Edit Profile",
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"Client Archive"} 
            component={ClientArchive}
            options={{
              title: "Client List",
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabel: ({ focused, color, position, children }) => null,
              tabBarButton: (props) => null // use a custom component to replace the default tab button
            }}
          />
          <Tab.Screen 
            name={"Client Update"} 
            component={ClientUpdate}
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