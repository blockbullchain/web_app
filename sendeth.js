let eth_eur_fx = 1800;
let price_eur = 150;
let bjr = "Bonjour ";
let account;
let amount = '0x' + (price_eur / eth_eur_fx * 10 ** 18).toString(16);
console.log('amount:' + amount);
document.getElementById('connect-button').addEventListener('click', event => {
        let button = event.target;
        ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                account = accounts[0];
                console.log(account);
                button.textContent = bjr + account;

                ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] }).then(result => {
                        console.log('balance: ' + result);
                        let wei = parseInt(result, 16);
                        console.log('wei: ' + wei);
                        let balance = wei / (10 ** 18);
                        console.log(balance + ' ETH');
                });
        });
});

document.getElementById('send-button').addEventListener('click', event => {
        let transactionParam = {
                to: '0xF986aeC4635e48A76D84C2628EE2174055c9A40B',
                from: account,
                value: amount
        };

        ethereum.request({ method: 'eth_sendTransaction', params: [transactionParam] }).then(txhash => {
                console.log(txhash);
                checkTransactionconfirmation(txhash).then(r => alert(r));
        });

});

function checkTransactionconfirmation(txhash) {
        let checkTransactionLoop = () => {
                return ethereum.request({ method: 'eth_getTransactionReceipt', params: [txhash] }).then(r => {
                        if (r != null) return 'confirmed';
                        else return checkTransactionLoop();
                });
        };
        return checkTransactionLoop();
}