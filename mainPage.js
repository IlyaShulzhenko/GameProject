function renderMainPage() {
    
    const container = document.createElement('div');
    const toRecordPage = document.createElement('button');
    const toGame = document.createElement('button');

    toRecordPage.innerText = 'Рекорды';
    toRecordPage.addEventListener('click', () => {
        switchToState({pageName: 'Record'});
    });
    toGame.innerText = 'Играть';
    toGame.addEventListener('click', () => {
        switchToState({pageName: 'Game'});
    });
    
    toGame.className = 'btn btn-secondary';
    toRecordPage.className = 'btn btn-secondary';

    container.append(toRecordPage);
    container.append(toGame);
    container.className = 'wrapperForm d-flex justify-content-center align-items-center';    
    
    return container;
}
