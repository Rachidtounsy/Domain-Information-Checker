function getDomainInformation() {
    var domainInput = document.getElementById('domainInput').value.trim();
    var resultContainer = document.getElementById('result');

    if (domainInput !== '') {
        // Clear previous results
        resultContainer.innerHTML = 'Loading...';

        // Replace 'YOUR_API_KEY' with your actual API key from Whois API
        var apiKey = 'at_truKG2LUw3OlyFnuXye9x3DXbFORT';
        var apiUrl = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domainInput}&outputFormat=json`;

        // Make request to Whois API
        axios.get(apiUrl)
            .then(response => {
                var domainInfo = response.data;
                displayDomainInformation(resultContainer, domainInfo);
            })
            .catch(error => {
                console.error(`Error fetching information for ${domainInput}: ${error.message}`);
                resultContainer.innerHTML = `<p>Error fetching information for ${domainInput}</p>`;
            });
    } else {
        resultContainer.innerHTML = '<p>Please enter a domain.</p>';
    }
}

function displayDomainInformation(container, info) {
    var reputationScore = getReputationScore(info);

    container.innerHTML = `
                <table>
            <tr>
                <th colspan="2">Domain Information</th>
            </tr>
            <tr>
			
                <td colspan="2">
                    <h3>${info.WhoisRecord.domainName}</h3>
                </td>
            </tr>
			<tr>
                <td>Organization:</td>
                <td>${info.WhoisRecord.registrant.organization || 'Not available'}</td>
            </tr>
            <tr>
                <td>Registrar:</td>
                <td>${info.WhoisRecord.registrarName}</td>
            </tr>
            <tr>
                <td>Creation Date:</td>
                <td>${info.WhoisRecord.createdDate}</td>
            </tr>
            <tr>
                <td>Expiration Date:</td>
                <td>${info.WhoisRecord.expiresDate}</td>
            </tr>
            
            <tr>
                <td>Registrant Name:</td>
                <td>${info.WhoisRecord.registrant.name}</td>
            </tr>
            <tr>
                <td>Registrant Email:</td>
                <td>${info.WhoisRecord.registrant.email}</td>
            </tr>
            <tr>
                <td>Registrant Phone:</td>
                <td>${info.WhoisRecord.registrant.telephone}</td>
            </tr>
            <tr>
                <td>Country:</td>
                <td>${info.WhoisRecord.registrant.country || 'Not available'}</td>
            </tr>
            <tr>
                <td>City:</td>
                <td>${info.WhoisRecord.registrant.city || 'Not available'}</td>
            </tr>
            <tr>
                <td>Postal Code:</td>
                <td>${info.WhoisRecord.registrant.postalCode || 'Not available'}</td>
            </tr>
            <tr>
                <td>Fax:</td>
                <td>${info.WhoisRecord.registrant.fax || 'Not available'}</td>
            </tr>
            <tr>
                <td>Reputation Score:</td>
                <td>${reputationScore}</td>
            </tr>
            <tr>
                <td>Updated Date:</td>
                <td>${info.WhoisRecord.updatedDate || 'Not available'}</td>
            </tr>
            <tr>
                <td>Record Update Dates:</td>
                <td>${info.WhoisRecord.recordUpdateDate || 'Not available'}</td>
            </tr>
        </table>

   `;
}

function getReputationScore(info) {
    // Adjust this logic based on the actual structure of your Whois API response
    if (info.WhoisRecord && info.WhoisRecord.registryData && info.WhoisRecord.registryData.reputation) {
        return info.WhoisRecord.registryData.reputation;
    } else {
        return 'Not available';
    }
}
