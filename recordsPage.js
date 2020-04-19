
function renderRecordsPage() {
    const records = JSON.parse(localStorage.getItem('records'));
    const notRecords = document.createElement('div');
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');
    const thNumber =  document.createElement('th');
    const thName =  document.createElement('th');
    const thRecord =  document.createElement('th');

    table.classList = 'table table-striped table-hover bg-light';
    thNumber.innerText = '#';
    thName.innerText = 'Name';
    thRecord.innerText = 'Record';

    tableHead.appendChild(thNumber);
    tableHead.appendChild(thName);
    tableHead.appendChild(thRecord);
    if (records) {
        const mapped = records.map(function(record, i) {
            return { index: i, value: record.result };
        });

        mapped.sort(function(a, b) {
            if (a.value < b.value) {
                return 1; }
            if (a.value > b.value) {
                return -1; }
            return 0;
        });

        const sortedResults = mapped.map(function(el) {
            return records[el.index];
        });

        sortedResults.forEach((record, index) => {
            const row = document.createElement('tr');
            const cellNumber = document.createElement('td');
            const cellName = document.createElement('td');
            const cellRecord = document.createElement('td');

            cellNumber.innerText = index + 1;
            cellName.innerText = record.userName;
            cellRecord.innerText = record.timeSting;

            row.appendChild(cellNumber);
            row.appendChild(cellName);
            row.appendChild(cellRecord);

            tableBody.appendChild(row);
        });

        table.appendChild(tableHead);
        table.appendChild(tableBody);
    } else {
        notRecords.innerText = 'еще нет рекордов';

        return notRecords
    }


    return table;
}
