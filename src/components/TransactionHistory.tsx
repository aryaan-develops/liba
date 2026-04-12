"use client";

import { useEffect, useState } from "react";
import styles from "./TransactionHistory.module.css";
import { Receipt, Download, ExternalLink } from "lucide-react";

export default function TransactionHistory() {
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('liba_transactions') || '[]');
        setTransactions(history);
    }, []);

    if (transactions.length === 0) {
        return (
            <div className={styles.emptyHistory}>
                <p>No transactions found yet. Your literary journey is just beginning.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((txn, index) => (
                        <tr key={txn.id || index}>
                            <td>{txn.date}</td>
                            <td className={styles.itemName}>{txn.item}</td>
                            <td><span className={styles.typeTag}>{txn.type}</span></td>
                            <td className={styles.amount}>{txn.amount}</td>
                            <td><span className={styles.statusPaid}>Paid</span></td>
                            <td>
                                <button className={styles.actionIcon} title="Download Bill">
                                    <Download size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
