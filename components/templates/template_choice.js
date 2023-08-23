import { classic_template } from "./invoice_templates/classic/classic";
import { colorful_template } from "./invoice_templates/colorful/colorful";
import { creative_template } from "./invoice_templates/creative/creative";
import { elegant_template } from "./invoice_templates/elegant/elegant";
import { minimalist_template } from "./invoice_templates/minimalist/minimalist";
import { modern_template } from "./invoice_templates/modern/modern";

export const template_choice = (company, client, tasks, subtotal, tax, total, note, dox, template) => {

    switch (template) {
        case '23f21047-b439-45d3-8c49-a3ce2a5dd1f7':
            return modern_template(company.name, company.address, company.email, company.avatar, client.company_name, client.company_address, client.company_email, tasks, subtotal, tax, total, note, dox);
        case '386724d2-1eb0-44c7-acb6-203181e3e338':
            return colorful_template(company.name, company.address, company.email, company.avatar, client.company_name, client.company_address, client.company_email, tasks, subtotal, tax, total, note, dox);
        case '415fb88c-9e0c-4870-b293-79c965a4921e':
            return creative_template(company.name, company.address, company.email, company.avatar, client.company_name, client.company_address, client.company_email, tasks, subtotal, tax, total, note, dox);
        case 'de5a6440-1b6d-4746-a86d-3c0b84337f77':
            return classic_template(company.name, company.address, company.email, company.avatar, client.company_name, client.company_address, client.company_email, tasks, subtotal, tax, total, note, dox);
        case '0dff9e98-8c1a-4261-a17a-ed4302a81b63':
            return minimalist_template(company.name, company.address, company.email, company.avatar, client.company_name, client.company_address, client.company_email, tasks, subtotal, tax, total, note, dox);
        case '44081270-2068-4477-b65b-d8ec28e446fa':
            return elegant_template(company.name, company.address, company.email, company.avatar, client.company_name, client.company_address, client.company_email, tasks, subtotal, tax, total, note, dox);
        default:
            return creative_template(company.name, company.address, company.email, company.avatar, client.company_name, client.company_address, client.company_email, tasks, subtotal, tax, total, note, dox);
    }
}
