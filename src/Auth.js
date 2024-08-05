import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './Auth.css';

const Auth = () => {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');

    const handleConnect = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                setAccount(account);

                const balanceInWei = await web3.eth.getBalance(account);
                const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
                setBalance(balanceInEth);

                // You can send registration/login request to backend here if needed
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('MetaMask is not detected.');
        }
    };

    useEffect(() => {
        handleConnect(); // Automatically connect on component mount
    }, []);

    return (
        <div className="auth-container">
            <h2>MetaMask Authentication</h2>
            {account ? (
                <p className="account">
                    Connected account: {account} <br />
                    Balance: {balance} ETH
                </p>
            ) : (
                <button onClick={handleConnect}>Connect with MetaMask</button>
            )}
        </div>
    );
};

export default Auth;
