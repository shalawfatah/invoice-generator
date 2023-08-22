export const template_choice = (name, profile, client, tasks, subtotal, tax, total, note) => {
    const templateParams = {
        name: name,
        address: profile?.address,
        email: profile.email,
        avatar: profile?.avatar,
        client_name: client?.client_name,
        client_address: client?.client_address,
        client_email: client?.client_email,
        tasks: tasks,
        subtotal: subtotal,
        tax: tax,
        total: total,
        note: note
    };

    switch (profile.template) {
        case '23f21047-b439-45d3-8c49-a3ce2a5dd1f7':
            return modern_template(templateParams);
        case '386724d2-1eb0-44c7-acb6-203181e3e338':
            return colorful_template(templateParams);
        case '415fb88c-9e0c-4870-b293-79c965a4921e':
            return creative_template(templateParams);
        case 'de5a6440-1b6d-4746-a86d-3c0b84337f77':
            return classic_template(templateParams);
        case '0dff9e98-8c1a-4261-a17a-ed4302a81b63':
            return minimalist_template(templateParams);
        case '44081270-2068-4477-b65b-d8ec28e446fa':
            return elegant_template(templateParams);
        default:
            return creative_template(templateParams);
    }
}
