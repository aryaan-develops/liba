"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import styles from "./page.module.css";
import { Check, Zap, Star, ShieldCheck } from "lucide-react";
import PaymentModal from "@/components/PaymentModal";

export default function SubscriptionPage() {
    const { user } = useAuth();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<{ title: string; price: string; author: string } | null>(null);

    const plans = [
        {
            name: "Basic Story",
            price: "$0",
            period: "/month",
            features: ["Access to free books", "1 book at a time", "Community support"],
            icon: <Check size={24} />,
            color: "#6b7280"
        },
        {
            name: "Liba Premium",
            price: "$9.99",
            period: "/month",
            features: ["Unlimited reading", "Borrow up to 10 books", "Exclusive library access", "No advertisements"],
            icon: <Zap size={24} />,
            color: "#d4a373",
            popular: true
        },
        {
            name: "Elite Scholar",
            price: "$99.99",
            period: "/year",
            features: ["Everything in Premium", "Early access to new releases", "Direct messaging to authors", "2 months free"],
            icon: <Star size={24} />,
            color: "#523c2b"
        }
    ];

    const handleSubscribe = (plan: any) => {
        if (plan.price === "$0") return;
        setSelectedPlan({
            title: plan.name,
            price: plan.price.replace('$', ''),
            author: "Library Subscription"
        });
        setIsPaymentModalOpen(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Elevate Your Reading</h1>
                <p className={styles.subtitle}>Choose a plan that fits your literary journey.</p>
            </div>

            <div className={styles.grid}>
                {plans.map((plan) => (
                    <div key={plan.name} className={`${styles.card} ${plan.popular ? styles.popular : ''}`}>
                        {plan.popular && <span className={styles.badge}>Most Popular</span>}
                        <div className={styles.planHeader}>
                            <div className={styles.iconBox} style={{ backgroundColor: plan.color }}>
                                {plan.icon}
                            </div>
                            <h2 className={styles.planName}>{plan.name}</h2>
                            <div className={styles.priceBox}>
                                <span className={styles.currency}>$</span>
                                <span className={styles.price}>{plan.price.replace('$', '')}</span>
                                <span className={styles.period}>{plan.period}</span>
                            </div>
                        </div>

                        <ul className={styles.features}>
                            {plan.features.map((feature) => (
                                <li key={feature} className={styles.feature}>
                                    <ShieldCheck size={16} className={styles.checkIcon} />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button 
                            className={`${styles.subscribeBtn} ${plan.price === '$0' ? styles.disabledBtn : ''}`}
                            onClick={() => handleSubscribe(plan)}
                            disabled={plan.price === '$0'}
                        >
                            {plan.price === '$0' ? 'Current Plan' : 'Upgrade Now'}
                        </button>
                    </div>
                ))}
            </div>

            <PaymentModal 
                isOpen={isPaymentModalOpen} 
                onClose={() => setIsPaymentModalOpen(false)} 
                item={selectedPlan}
            />
        </div>
    );
}
