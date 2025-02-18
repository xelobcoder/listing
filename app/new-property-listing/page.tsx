"use client"
"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './PropertyForm.module.css';

type PropertyFormData = {
    title: string;
    description: string;
    property_type: string;
    listing_type: string;
    price: number;
    currency: string;
    location: {
        address: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    features: {
        bedrooms: number;
        bathrooms: number;
        square_feet: number;
        year_built: number;
        furnished: boolean;
        pet_friendly: boolean;
        balcony: boolean;
        garden: boolean;
        swimming_pool: boolean;
        gym: boolean;
        security: boolean;
    };
    media: {
        images: string[];
        videos: string[];
        virtual_tour: string;
    };
    utilities: {
        electricity: boolean;
        water: boolean;
        internet: boolean;
        gas: boolean;
    };
    nearby_amenities: string[];
    owner_details: {
        owner_id: string;
        name: string;
        contact_number: string;
        email: string;
    };
    agent_details: {
        agent_id: string;
        name: string;
        contact_number: string;
        email: string;
        agency: string;
        license_number: string;
    };
    listing_details: {
        date_listed: string;
        listing_status: string;
        expiry_date: string;
    };
};

const validationSchema = yup.object({
    title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
    description: yup.string().min(10, 'Description must be at least 10 characters').required('Description is required'),
    property_type: yup.string().required('Property Type is required'),
    listing_type: yup.string().required('Listing Type is required'),
    price: yup.number().positive('Price must be positive').required('Price is required'),
    currency: yup.string().required('Currency is required'),
    location: yup.object({
        address: yup.string().required('Address is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
        postal_code: yup.string().required('Postal Code is required'),
        country: yup.string().required('Country is required')
    }).required(),
    features: yup.object({
        bedrooms: yup.number().min(0, 'Bedrooms must be 0 or more').required('Number of Bedrooms is required'),
        bathrooms: yup.number().min(0, 'Bathrooms must be 0 or more').required('Number of Bathrooms is required'),
        square_feet: yup.number().min(0, 'Square Feet must be 0 or more').required('Square Feet is required'),
        year_built: yup.number().required('Year Built is required'),
        furnished: yup.boolean(),
        pet_friendly: yup.boolean(),
        balcony: yup.boolean(),
        garden: yup.boolean(),
        swimming_pool: yup.boolean(),
        gym: yup.boolean(),
        security: yup.boolean()
    }).required(),
    media: yup.object({
        images: yup.array().of(yup.string().url('Must be a valid URL')),
        videos: yup.array().of(yup.string()),
        virtual_tour: yup.string().url('Must be a valid URL').nullable()
    }),
    utilities: yup.object({
        electricity: yup.boolean(),
        water: yup.boolean(),
        internet: yup.boolean(),
        gas: yup.boolean()
    }),
    nearby_amenities: yup.array().of(yup.string()),
    owner_details: yup.object({
        owner_id: yup.string().required('Owner ID is required'),
        name: yup.string().required('Owner name is required'),
        contact_number: yup.string().required('Owner contact number is required'),
        email: yup.string().email('Invalid email').required('Owner email is required')
    }).required(),
    agent_details: yup.object({
        agent_id: yup.string(),
        name: yup.string(),
        contact_number: yup.string(),
        email: yup.string().email('Invalid email'),
        agency: yup.string(),
        license_number: yup.string()
    }),
    listing_details: yup.object({
        date_listed: yup.string().required('Date Listed is required'),
        listing_status: yup.string().required('Listing Status is required'),
        expiry_date: yup.string().nullable()
    }).required()
}).required();

const PropertyForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PropertyFormData>({
        resolver: yupResolver(validationSchema as any),
        defaultValues: {
            title: '',
            description: '',
            property_type: 'Apartment',
            listing_type: 'For Sale',
            price: 0,
            currency: 'USD',
            location: {
                address: '',
                city: '',
                state: '',
                postal_code: '',
                country: ''
            },
            features: {
                bedrooms: 0,
                bathrooms: 0,
                square_feet: 0,
                year_built: new Date().getFullYear(),
                furnished: false,
                pet_friendly: false,
                balcony: false,
                garden: false,
                swimming_pool: false,
                gym: false,
                security: false
            },
            media: {
                images: [],
                videos: [],
                virtual_tour: ''
            },
            utilities: {
                electricity: false,
                water: false,
                internet: false,
                gas: false
            },
            nearby_amenities: [],
            owner_details: {
                owner_id: '',
                name: '',
                contact_number: '',
                email: ''
            },
            agent_details: {
                agent_id: '',
                name: '',
                contact_number: '',
                email: '',
                agency: '',
                license_number: ''
            },
            listing_details: {
                date_listed: new Date().toISOString().split('T')[0],
                listing_status: 'Active',
                expiry_date: ''
            }
        }
    });

    const onSubmit: SubmitHandler<PropertyFormData> = async data => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Submitted Data:', data);
        alert('Property submitted successfully!');
    };

    return (
        <div className={`container mt-5 ${styles.formContainer}`}>
            <h1 className="mb-4">Property Listing Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* General Information */}
                <div className={`mb-3 ${styles.inputWrapper}`}>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        {...register('title')}
                        className={`form-control ${styles.inputField} ${errors.title ? 'is-invalid' : ''}`}
                    />
                    {errors.title && <span className="invalid-feedback">{errors.title.message}</span>}
                </div>

                <div className={`mb-3 ${styles.inputWrapper}`}>
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        {...register('description')}
                        className={`form-control ${styles.inputField} ${errors.description ? 'is-invalid' : ''}`}
                        rows={4}
                    />
                    {errors.description && <span className="invalid-feedback">{errors.description.message}</span>}
                </div>

                {/* Property Details */}
                <div className="row">
                    <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                        <label htmlFor="property_type" className="form-label">Property Type</label>
                        <select
                            id="property_type"
                            {...register('property_type')}
                            className={`form-select ${styles.inputField} ${errors.property_type ? 'is-invalid' : ''}`}
                        >
                            <option value="Apartment">Apartment</option>
                            <option value="House">House</option>
                            <option value="Condo">Condo</option>
                            <option value="Land">Land</option>
                        </select>
                        {errors.property_type && <span className="invalid-feedback">{errors.property_type.message}</span>}
                    </div>

                    <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                        <label htmlFor="listing_type" className="form-label">Listing Type</label>
                        <select
                            id="listing_type"
                            {...register('listing_type')}
                            className={`form-select ${styles.inputField} ${errors.listing_type ? 'is-invalid' : ''}`}
                        >
                            <option value="For Sale">For Sale</option>
                            <option value="For Rent">For Rent</option>
                        </select>
                        {errors.listing_type && <span className="invalid-feedback">{errors.listing_type.message}</span>}
                    </div>
                </div>

                {/* Pricing */}
                <div className="row">
                    <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="number"
                            id="price"
                            {...register('price', { valueAsNumber: true })}
                            className={`form-control ${styles.inputField} ${errors.price ? 'is-invalid' : ''}`}
                        />
                        {errors.price && <span className="invalid-feedback">{errors.price.message}</span>}
                    </div>

                    <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                        <label htmlFor="currency" className="form-label">Currency</label>
                        <select
                            id="currency"
                            {...register('currency')}
                            className={`form-select ${styles.inputField} ${errors.currency ? 'is-invalid' : ''}`}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="NGN">NGN</option>
                        </select>
                        {errors.currency && <span className="invalid-feedback">{errors.currency.message}</span>}
                    </div>
                </div>

                {/* Location Details */}
                <div className="mb-4">
                    <h3>Location Details</h3>
                    <div className="row">
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="location.address" className="form-label">Address</label>
                            <input
                                type="text"
                                id="location.address"
                                {...register('location.address')}
                                className={`form-control ${styles.inputField} ${errors.location?.address ? 'is-invalid' : ''}`}
                            />
                            {errors.location?.address && <span className="invalid-feedback">{errors.location.address.message}</span>}
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="location.city" className="form-label">City</label>
                            <input
                                type="text"
                                id="location.city"
                                {...register('location.city')}
                                className={`form-control ${styles.inputField} ${errors.location?.city ? 'is-invalid' : ''}`}
                            />
                            {errors.location?.city && <span className="invalid-feedback">{errors.location.city.message}</span>}
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="location.state" className="form-label">State</label>
                            <input
                                type="text"
                                id="location.state"
                                {...register('location.state')}
                                className={`form-control ${styles.inputField} ${errors.location?.state ? 'is-invalid' : ''}`}
                            />
                            {errors.location?.state && <span className="invalid-feedback">{errors.location.state.message}</span>}
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="location.postal_code" className="form-label">Postal Code</label>
                            <input
                                type="text"
                                id="location.postal_code"
                                {...register('location.postal_code')}
                                className={`form-control ${styles.inputField} ${errors.location?.postal_code ? 'is-invalid' : ''}`}
                            />
                            {errors.location?.postal_code && <span className="invalid-feedback">{errors.location.postal_code.message}</span>}
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="location.country" className="form-label">Country</label>
                            <input
                                type="text"
                                id="location.country"
                                {...register('location.country')}
                                className={`form-control ${styles.inputField} ${errors.location?.country ? 'is-invalid' : ''}`}
                            />
                            {errors.location?.country && <span className="invalid-feedback">{errors.location.country.message}</span>}
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                    <h3>Features</h3>
                    <div className="row">
                        <div className={`col-md-4 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="features.bedrooms" className="form-label">Bedrooms</label>
                            <input
                                type="number"
                                id="features.bedrooms"
                                {...register('features.bedrooms', { valueAsNumber: true })}
                                className={`form-control ${styles.inputField} ${errors.features?.bedrooms ? 'is-invalid' : ''}`}
                            />
                            {errors.features?.bedrooms && <span className="invalid-feedback">{errors.features.bedrooms.message}</span>}
                        </div>
                        <div className={`col-md-4 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="features.bathrooms" className="form-label">Bathrooms</label>
                            <input
                                type="number"
                                id="features.bathrooms"
                                {...register('features.bathrooms', { valueAsNumber: true })}
                                className={`form-control ${styles.inputField} ${errors.features?.bathrooms ? 'is-invalid' : ''}`}
                            />
                            {errors.features?.bathrooms && <span className="invalid-feedback">{errors.features.bathrooms.message}</span>}
                        </div>
                        <div className={`col-md-4 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="features.square_feet" className="form-label">Square Feet</label>
                            <input
                                type="number"
                                id="features.square_feet"
                                {...register('features.square_feet', { valueAsNumber: true })}
                                className={`form-control ${styles.inputField} ${errors.features?.square_feet ? 'is-invalid' : ''}`}
                            />
                            {errors.features?.square_feet && <span className="invalid-feedback">{errors.features.square_feet.message}</span>}
                        </div>
                        <div className={`col-md-4 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="features.year_built" className="form-label">Year Built</label>
                            <input
                                type="number"
                                id="features.year_built"
                                {...register('features.year_built', { valueAsNumber: true })}
                                className={`form-control ${styles.inputField} ${errors.features?.year_built ? 'is-invalid' : ''}`}
                            />
                            {errors.features?.year_built && <span className="invalid-feedback">{errors.features.year_built.message}</span>}
                        </div>
                    </div>
                </div>

                {/* Owner Details */}
                <div className="mb-4">
                    <h3>Owner Details</h3>
                    <div className="row">
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="owner_details.owner_id" className="form-label">Owner ID</label>
                            <input
                                type="text"
                                id="owner_details.owner_id"
                                {...register('owner_details.owner_id')}
                                className={`form-control ${styles.inputField} ${errors.owner_details?.owner_id ? 'is-invalid' : ''}`}
                            />
                            {errors.owner_details?.owner_id && <span className="invalid-feedback">{errors.owner_details.owner_id.message}</span>}
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="owner_details.name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="owner_details.name"
                                {...register('owner_details.name')}
                                className={`form-control ${styles.inputField} ${errors.owner_details?.name ? 'is-invalid' : ''}`}
                            />
                            {errors.owner_details?.name && <span className="invalid-feedback">{errors.owner_details.name.message}</span>}
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="owner_details.contact_number" className="form-label">Contact Number</label>
                            <input
                                type="text"
                                id="owner_details.contact_number"
                                {...register('owner_details.contact_number')}
                                className={`form-control ${styles.inputField} ${errors.owner_details?.contact_number ? 'is-invalid' : ''}`}
                            />
                            {errors.owner_details?.contact_number && <span className="invalid-feedback">{errors.owner_details.contact_number.message}</span>}
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="owner_details.email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="owner_details.email"
                                {...register('owner_details.email')}
                                className={`form-control ${styles.inputField} ${errors.owner_details?.email ? 'is-invalid' : ''}`}
                            />
                            {errors.owner_details?.email && <span className="invalid-feedback">{errors.owner_details.email.message}</span>}
                        </div>
                    </div>
                </div>

                {/* Agent Details */}
                <div className="mb-4">
                    <h3>Agent Details</h3>
                    <div className="row">
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="agent_details.agent_id" className="form-label">Agent ID</label>
                            <input
                                type="text"
                                id="agent_details.agent_id"
                                {...register('agent_details.agent_id')}
                                className={`form-control ${styles.inputField}`}
                            />
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="agent_details.name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="agent_details.name"
                                {...register('agent_details.name')}
                                className={`form-control ${styles.inputField}`}
                            />
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="agent_details.contact_number" className="form-label">Contact Number</label>
                            <input
                                type="text"
                                id="agent_details.contact_number"
                                {...register('agent_details.contact_number')}
                                className={`form-control ${styles.inputField}`}
                            />
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="agent_details.email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="agent_details.email"
                                {...register('agent_details.email')}
                                className={`form-control ${styles.inputField}`}
                            />
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="agent_details.agency" className="form-label">Agency</label>
                            <input
                                type="text"
                                id="agent_details.agency"
                                {...register('agent_details.agency')}
                                className={`form-control ${styles.inputField}`}
                            />
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="agent_details.license_number" className="form-label">License Number</label>
                            <input
                                type="text"
                                id="agent_details.license_number"
                                {...register('agent_details.license_number')}
                                className={`form-control ${styles.inputField}`}
                            />
                        </div>
                    </div>
                </div>

                {/* Listing Details */}
                <div className="mb-4">
                    <h3>Listing Details</h3>
                    <div className="row">
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="listing_details.date_listed" className="form-label">Date Listed</label>
                            <input
                                type="date"
                                id="listing_details.date_listed"
                                {...register('listing_details.date_listed')}
                                className={`form-control ${styles.inputField} ${errors.listing_details?.date_listed ? 'is-invalid' : ''}`}
                            />
                            {errors.listing_details?.date_listed && <span className="invalid-feedback">{errors.listing_details.date_listed.message}</span>}
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="listing_details.listing_status" className="form-label">Listing Status</label>
                            <select
                                id="listing_details.listing_status"
                                {...register('listing_details.listing_status')}
                                className={`form-select ${styles.inputField} ${errors.listing_details?.listing_status ? 'is-invalid' : ''}`}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            {errors.listing_details?.listing_status && <span className="invalid-feedback">{errors.listing_details.listing_status.message}</span>}
                        </div>
                        <div className={`col-md-6 mb-3 ${styles.inputWrapper}`}>
                            <label htmlFor="listing_details.expiry_date" className="form-label">Expiry Date</label>
                            <input
                                type="date"
                                id="listing_details.expiry_date"
                                {...register('listing_details.expiry_date')}
                                className={`form-control ${styles.inputField}`}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Property"}
                </button>
            </form>
        </div>
    );
};

export default PropertyForm;