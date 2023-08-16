export const creative_template = (
    company_name, company_address, company_email, company_logo,
    client_name, client_address, client_email,
    tasks, subtotal, tax, total, note, dox
) => `<html lang="en">
<body class="p-8">

  <div class="flex items-center justify-between mb-12">
    <div class="h-16 w-16 rounded-full overflow-hidden">
      <img src=${company_logo} alt="Company Logo" class="h-full w-full object-cover">
    </div>
    <div class="text-right">
      <h1 class="text-2xl font-bold">${company_name}</h1>
      <p>${company_address}</p>
      <p>${company_email}</p>
    </div>
  </div>
  <div class="text-center mb-12">
    <h2 class="text-5xl font-semibold">${dox}</h2>
  </div>
  <div class="mb-12">
    <h2 class="text-lg font-bold mb-2">To:</h2>
    <p>${client_name}</p>
    <p>${client_address}</p>
    <p>${client_email}</p>
  </div>

  <table class="w-full border-collapse border">
    <thead>
      <tr class="bg-gray-200">
        <th class="py-2 px-4 border text-left">Task</th>
        <th class="py-2 px-4 border text-left">Amount</th>
      </tr>
    </thead>
    <tbody>
    ${tasks.map(item => {
        return `<tr>
            <td style="padding: 0.5rem 1rem; border: 1px solid black;">${item.text}</td>
            <td style="padding: 0.5rem 1rem; border: 1px solid black;">$${item.number}</td>
        </tr>`
    }).join('')}
    <tr>
        <td style="padding: 0.5rem 1rem; border: 1px solid black;">${note}</td>
    </tr>
    </tbody>
  </table>

  <div class="mt-12 text-right">
    <p class="mb-2">Subtotal: ${subtotal}</p>
    <p class="mb-2">Tax: ${tax}</p>
    <p class="font-bold">Total: ${total}</p>
  </div>

  <div class="mt-12 text-center text-sm text-gray-500">
    <p>&copy; 2023 ${company_name}. All rights reserved.</p>
  </div>

</body>

</html>`