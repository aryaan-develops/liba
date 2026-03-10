"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { BookPlus, Camera, Info, CheckCircle } from "lucide-react";

export default function SellPage() {
    const [step, setStep] = useState(1);

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <header className={styles.header}>
                        <span className={styles.stepIndicator}>Step {step} of 3</span>
                        <h1 className={styles.title}>List Your Story</h1>
                        <p className={styles.subtitle}>Help your book find its next curious reader.</p>
                    </header>

                    <div className={styles.formCard}>
                        {step === 1 && (
                            <div className={styles.stepContent}>
                                <div className={styles.inputGroup}>
                                    <label>Title of the Book</label>
                                    <input type="text" placeholder="e.g. The Great Gatsby" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Author</label>
                                    <input type="text" placeholder="e.g. F. Scott Fitzgerald" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Condition</label>
                                    <select>
                                        <option>Like New</option>
                                        <option>Good</option>
                                        <option>Fair</option>
                                        <option>Well Loved</option>
                                    </select>
                                </div>
                                <button className={styles.nextBtn} onClick={() => setStep(2)}>Next Step</button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className={styles.stepContent}>
                                <div className={styles.photoUpload}>
                                    <div className={styles.uploadBox}>
                                        <Camera size={40} />
                                        <p>Upload a photo of the book</p>
                                        <span>JPEG, PNG up to 5MB</span>
                                    </div>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Listing Type</label>
                                    <div className={styles.radioGroup}>
                                        <label className={styles.radioLabel}>
                                            <input type="radio" name="type" defaultChecked />
                                            <span>For Lending (Community)</span>
                                        </label>
                                        <label className={styles.radioLabel}>
                                            <input type="radio" name="type" />
                                            <span>For Sale (Permanent)</span>
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.btnRow}>
                                    <button className={styles.backBtn} onClick={() => setStep(1)}>Back</button>
                                    <button className={styles.nextBtn} onClick={() => setStep(3)}>Next Step</button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className={styles.successContent}>
                                <div className={styles.successIcon}><CheckCircle size={80} /></div>
                                <h2>Ready to Publish!</h2>
                                <p>Verify your details and start connecting with readers in your neighborhood.</p>
                                <div className={styles.summary}>
                                    <p><strong>Type:</strong> For Lending</p>
                                    <p><strong>Visibility:</strong> Local Community (5 miles)</p>
                                </div>
                                <button className={styles.publishBtn}>Publish Listing</button>
                                <button className={styles.backBtn} onClick={() => setStep(2)}>Review</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
