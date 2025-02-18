"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './NewRealtorAgents.module.css';

type AgentFormData = {
    agent_id: string;
    name: string;
    contact_number: string;
    email: string;
    agency: string;
    license_number: string;
};

const validationSchema = yup.object({
    agent_id: yup.string().min(3, 'Agent ID must be at least 3 characters').required('Agent ID is required'),
    name: yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
    contact_number: yup.string().required('Contact number is required').max(10,'ten numbers rquired').min(10,'10 numbers required '),
    email: yup.string().email('Invalid email format').required('Email is required'),
    agency: yup.string().required('Agency is required'),
    license_number: yup.string().required('License number is required'),
}).required();

const NewRealtorAgents: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<AgentFormData>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<AgentFormData> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 2000)); // simulate server delay
        console.log("Agent Information Submitted:", data);
        alert("Agent information submitted successfully!");
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>New Realtor Agent Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
                <div className={styles.inputWrapper}>
                    <label htmlFor="agent_id" className={styles.label}>Agent ID</label>
                    <input
                        id="agent_id"
                        type="text"
                        {...register("agent_id")}
                        className={`${styles.inputField} ${errors.agent_id ? styles.errorInput : ""}`}
                    />
                    {errors.agent_id && <p className={styles.errorText}>{errors.agent_id.message}</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className={`${styles.inputField} ${errors.name ? styles.errorInput : ""}`}
                    />
                    {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label htmlFor="contact_number" className={styles.label}>Contact Number</label>
                    <input
                        id="contact_number"
                        type="text"
                        {...register("contact_number")}
                        className={`${styles.inputField} ${errors.contact_number ? styles.errorInput : ""}`}
                    />
                    {errors.contact_number && <p className={styles.errorText}>{errors.contact_number.message}</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className={`${styles.inputField} ${errors.email ? styles.errorInput : ""}`}
                    />
                    {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label htmlFor="agency" className={styles.label}>Agency</label>
                    <input
                        id="agency"
                        type="text"
                        {...register("agency")}
                        className={`${styles.inputField} ${errors.agency ? styles.errorInput : ""}`}
                    />
                    {errors.agency && <p className={styles.errorText}>{errors.agency.message}</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label htmlFor="license_number" className={styles.label}>License Number</label>
                    <input
                        id="license_number"
                        type="text"
                        {...register("license_number")}
                        className={`${styles.inputField} ${errors.license_number ? styles.errorInput : ""}`}
                    />
                    {errors.license_number && <p className={styles.errorText}>{errors.license_number.message}</p>}
                </div>

                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting && <span className={styles.spinner} />}
                    {isSubmitting ? "Submitting..." : "Submit Agent Information"}
                </button>
            </form>
        </div>
    );
};

export default NewRealtorAgents;