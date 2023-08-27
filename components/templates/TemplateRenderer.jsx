import { ScrollView, View } from "react-native";
import Classic from "./invoice_templates/classic/Classic";
import Colorful from "./invoice_templates/colorful/Colorful";
import Creative from "./invoice_templates/creative/Creative";
import Elegant from "./invoice_templates/elegant/Elegant";
import Minimalist from "./invoice_templates/minimalist/Minimalist";
import Modern from "./invoice_templates/modern/Modern";

const TemplateRenderer = ({ template_id, profile, client, tasks, subtotal, tax, total, note, dox, document_number }) => {
    let component;
  
    switch (template_id) {
      case '23f21047-b439-45d3-8c49-a3ce2a5dd1f7':
        component = (
          <Modern
            company_name={profile.name}
            company_address={profile.address}
            company_email={profile.email}
            company_logo={profile.avatar}
            client_name={client.company_name}
            client_address={client.company_address}
            client_email={client.company_email}
            tasks={tasks}
            subtotal={subtotal}
            tax={tax}
            total={total}
            note={note}
            dox={dox}
            document_number={document_number}
          />
        );
        break;
      case '386724d2-1eb0-44c7-acb6-203181e3e338':
        component = (
          <Colorful
            company_name={profile.name}
            company_address={profile.address}
            company_email={profile.email}
            company_logo={profile.avatar}
            client_name={client.company_name}
            client_address={client.company_address}
            client_email={client.company_email}
            tasks={tasks}
            subtotal={subtotal}
            tax={tax}
            total={total}
            note={note}
            dox={dox}
            document_number={document_number}
          />
        );
        break;
        case 'de5a6440-1b6d-4746-a86d-3c0b84337f77':
            component = (
                  <Classic 
                    company_name={profile.name}
                    company_address={profile.address}
                    company_email={profile.email}
                    company_logo={profile.avatar}
                    client_name={client.company_name}
                    client_address={client.company_address}
                    client_email={client.company_email}
                    tasks={tasks} 
                    subtotal={subtotal}
                    tax={tax} 
                    total={total}
                    note={note}
                    dox={dox}
                    document_number={document_number}
                  />)
                break;
                case '0dff9e98-8c1a-4261-a17a-ed4302a81b63':
                    component = (<Minimalist 
                        company_name={profile.name}
                        company_address={profile.address}
                        company_email={profile.email}
                        company_logo={profile.avatar}
                        client_name={client.company_name}
                        client_address={client.company_address}
                        client_email={client.company_email}
                        tasks={tasks} 
                        subtotal={subtotal}
                        tax={tax} 
                        total={total}
                        note={note}
                        dox={dox}
                        document_number={document_number}
                      />)
                      break;
                      case '44081270-2068-4477-b65b-d8ec28e446fa':
                        component = (<Elegant 
                            company_name={profile.name}
                            company_address={profile.address}
                            company_email={profile.email}
                            company_logo={profile.avatar}
                            client_name={client.company_name}
                            client_address={client.company_address}
                            client_email={client.company_email}
                            tasks={tasks} 
                            subtotal={subtotal}
                            tax={tax} 
                            total={total}
                            note={note}
                            dox={dox}
                            document_number={document_number}
                          />)
                          break;
      default:
        component = (
          <Creative
            company_name={profile.name}
            company_address={profile.address}
            company_email={profile.email}
            company_logo={profile.avatar}
            client_name={client.company_name}
            client_address={client.company_address}
            client_email={client.company_email}
            tasks={tasks}
            subtotal={subtotal}
            tax={tax}
            total={total}
            note={note}
            dox={dox}
            document_number={document_number}
          />
        );
        break;
    }
  
    return (
      <View>
        <ScrollView>
          {profile !== null && component}
        </ScrollView>
      </View>
    );
  };
  
  export default TemplateRenderer;