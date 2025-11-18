// NutritionCalculator.js
import React, { useState, useEffect, useRef } from 'react';
import './nutrition-calculator.css';
import { BASEURL } from '../../utils/config';
const NutritionCalculator = () => {
    const [formData, setFormData] = useState({
        age: 30,
        gender: 'male',
        height: 170,
        weight: 70,
        activity: 1.55,
        goal: 'maintain'
    });

    const [dietType, setDietType] = useState('balanced');
    const [results, setResults] = useState({
        protein: { value: 118, range: '60 - 166' },
        carbs: { value: 259, range: '207 - 348' },
        sugar: { value: 55, range: '44 - 77' },
        fat: { value: 65, range: '40 - 89' },
        sugarLimit: 52,
        saturatedFatLimit: 22,
        calories: 1941,
        kj: 8127
    });

    useEffect(() => {
        setDefaultResults();
    }, []);

    // Recalculate immediately when diet type changes so UI updates on button click
    useEffect(() => {
        // Use client-side calculation for instant feedback
        calculateClientSide();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dietType]);

    const setDefaultResults = () => {
        setResults({
            protein: { value: 118, range: '60 - 166' },
            carbs: { value: 259, range: '207 - 348' },
            sugar: { value: 55, range: '44 - 77' },
            fat: { value: 65, range: '40 - 89' },
            sugarLimit: 52,
            saturatedFatLimit: 22,
            calories: 1941,
            kj: 8127
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' || name === 'height' || name === 'weight' ? parseInt(value) : value
        }));
    };

    const calculateNutrition = async () => {
        // Validate inputs
        if (!formData.age || !formData.height || !formData.weight) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            // Call backend API
            const response = await fetch(`${BASEURL}/nutrition/calculate-nutrition`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    ...formData,
                    dietType
                })
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data.results);
            } else {
                // Fallback to client-side calculation if API fails
                calculateClientSide();
            }
        } catch (error) {
            console.error('API call failed, using client-side calculation:', error);
            calculateClientSide();
        }
    };

    const calculateClientSide = () => {
        const { age, gender, height, weight, activity, goal } = formData;

        // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Calculate TDEE (Total Daily Energy Expenditure)
        const tdee = bmr * parseFloat(activity);

        // Calculate calorie target based on goal
        let calorieTarget;
        switch(goal) {
            case 'lose':
                calorieTarget = tdee - 500;
                break;
            case 'gain':
                calorieTarget = tdee + 500;
                break;
            default:
                calorieTarget = tdee;
        }

        // Calculate macronutrient distribution based on diet type
        let proteinPercentage, carbsPercentage, fatPercentage;

        switch(dietType) {
            case 'balanced':
                proteinPercentage = 0.20;
                carbsPercentage = 0.50;
                fatPercentage = 0.30;
                break;
            case 'high-protein':
                proteinPercentage = 0.35;
                carbsPercentage = 0.40;
                fatPercentage = 0.25;
                break;
            default:
                proteinPercentage = 0.20;
                carbsPercentage = 0.50;
                fatPercentage = 0.30;
        }

        // Calculate grams for each macronutrient
        const proteinGrams = Math.round((calorieTarget * proteinPercentage) / 4);
        const carbsGrams = Math.round((calorieTarget * carbsPercentage) / 4);
        const fatGrams = Math.round((calorieTarget * fatPercentage) / 9);

        // Calculate ranges
        const proteinMin = Math.round(proteinGrams * 0.5);
        const proteinMax = Math.round(proteinGrams * 1.4);

        const carbsMin = Math.round(carbsGrams * 0.8);
        const carbsMax = Math.round(carbsGrams * 1.35);

        const fatMin = Math.round(fatGrams * 0.6);
        const fatMax = Math.round(fatGrams * 1.4);

        // (Sugar and saturated fat calculations removed)

        // Update results
        setResults({
            protein: { value: proteinGrams, range: proteinMin + ' - ' + proteinMax },
            carbs: { value: carbsGrams, range: carbsMin + ' - ' + carbsMax },
            sugar: { value: 0, range: '' },
            fat: { value: fatGrams, range: fatMin + ' - ' + fatMax },
            sugarLimit: 0,
            saturatedFatLimit: 0,
            calories: Math.round(calorieTarget),
            kj: Math.round(calorieTarget * 4.184)
        });
    };

    const clearForm = React.useCallback(() => {
        setFormData({
            age: '',
            gender: 'male',
            height: '',
            weight: '',
            activity: 1.55,
            goal: 'maintain'
        });
        setDefaultResults();
    }, []);

    const saveProfile = async () => {
        // Helper to parse range string like "110 - 307" into {min, max}
        const parseRange = (rangeStr) => {
            if (!rangeStr || typeof rangeStr !== 'string') return { min: null, max: null };
            const parts = rangeStr.split('-').map(s => s.replace(/[^0-9]/g, '').trim()).filter(Boolean);
            const min = parts[0] ? parseInt(parts[0], 10) : null;
            const max = parts[1] ? parseInt(parts[1], 10) : null;
            return { min, max };
        };

        // Build nutrition object from results using value + parsed min/max
        const proteinRange = parseRange(results.protein?.range);
        const carbsRange = parseRange(results.carbs?.range);
        const fatRange = parseRange(results.fat?.range);

        // Map activity numeric value to descriptive label
        const activityLabels = {
            '1.2': 'Sedentary: little or no exercise',
            '1.375': 'Light: exercise 1-3 times/week',
            '1.55': 'Moderate: exercise 4-5 times/week',
            '1.725': 'Active: daily exercise or intense exercise 3-4 times/week',
            '1.9': 'Very Active: intense exercise 6-7 times/week'
        };

        const nutrition = {
            calories: results.calories || 0,
            protein: { value: results.protein?.value || 0, min: proteinRange.min, max: proteinRange.max },
            carbs: { value: results.carbs?.value || 0, min: carbsRange.min, max: carbsRange.max },
            fat: { value: results.fat?.value || 0, min: fatRange.min, max: fatRange.max }
        };
        // Use descriptive activity label for storing
        const activityLabel = activityLabels[String(formData.activity)] || String(formData.activity);
        try {
            const goalLabels = {
                maintain: 'Maintain weight',
                lose: 'Lose weight',
                gain: 'Gain weight'
            };

            const payload = {
                age: formData.age,
                gender: formData.gender,
                height: formData.height,
                weight: formData.weight,
                activity: activityLabel,
                goal: goalLabels[String(formData.goal)] || String(formData.goal),
                dietType,
                nutrition
            };

            const resp = await fetch(`${BASEURL}/nutrition/profiles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (resp.ok) {
                await resp.json();
                alert('Profile saved successfully');
            } else {
                const err = await resp.json();
                console.error('Save failed', err);
                alert('Failed to save profile');
            }
        } catch (error) {
            console.error('Network error saving profile', error);
            alert('Network error saving profile');
        }
    };

    const handleDietTypeChange = (type) => {
        setDietType(type);
    };

    // Refs for keyboard navigation
    const ageRef = useRef(null);
    const genderRef = useRef(null);
    const heightRef = useRef(null);
    const weightRef = useRef(null);
    const activityRef = useRef(null);
    const goalRef = useRef(null);
    const calculateRef = useRef(null);
    const clearRef = useRef(null);

    const focusElement = (el) => {
        if (el && el.current) {
            try { el.current.focus(); } catch(e) {}
        }
    };

    const handleKeyNav = (e, prevRef, nextRef) => {
        if (e.key === 'Enter' || e.key === 'ArrowDown') {
            e.preventDefault();
            focusElement(nextRef);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            focusElement(prevRef);
        }
    };


    const formatDietTypeName = (type) => {
        return type.split('-').map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    };

    return React.createElement('div', { className: 'nutrition-calculator' },
        React.createElement('div', { className: 'container' },
            React.createElement('header', null,
                React.createElement('h1', null, 'Nutrition Calculator')
            ),
            
            React.createElement('div', { className: 'calculator' },
                React.createElement('div', { className: 'input-section' },
                    React.createElement('div', { className: 'unit-toggle single' },
                        React.createElement('div', { className: 'unit-option active' }, 'Metric Units')
                    ),
                    
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'age' }, 'Age'),
                        React.createElement('input', {
                            type: 'number',
                            id: 'age',
                            name: 'age',
                            min: '18',
                            max: '80',
                            value: formData.age,
                            onChange: handleInputChange,
                            ref: ageRef,
                            onKeyDown: (e) => handleKeyNav(e, null, genderRef)
                        }),
                        React.createElement('div', { className: 'result-range' }, 'ages 18 - 80')
                    ),
                    
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', null, 'Gender'),
                        React.createElement('div', { className: 'radio-group' },
                            React.createElement('div', { className: 'radio-option' },
                                React.createElement('input', {
                                    type: 'radio',
                                    id: 'male',
                                    name: 'gender',
                                    value: 'male',
                                    checked: formData.gender === 'male',
                                    onChange: handleInputChange,
                                    ref: genderRef,
                                    onKeyDown: (e) => {
                                        if (e.key === 'Enter' || e.key === 'ArrowDown') {
                                            e.preventDefault();
                                            setFormData(prev=>({ ...prev, gender: 'male' }));
                                            focusElement(heightRef);
                                        } else if (e.key === 'ArrowUp') {
                                            e.preventDefault();
                                            focusElement(ageRef);
                                        }
                                    }
                                }),
                                React.createElement('label', { htmlFor: 'male' }, 'Male')
                            ),
                            React.createElement('div', { className: 'radio-option' },
                                React.createElement('input', {
                                    type: 'radio',
                                    id: 'female',
                                    name: 'gender',
                                    value: 'female',
                                    checked: formData.gender === 'female',
                                    onChange: handleInputChange,
                                    onKeyDown: (e) => {
                                        if (e.key === 'Enter' || e.key === 'ArrowDown') {
                                            e.preventDefault();
                                            setFormData(prev=>({ ...prev, gender: 'female' }));
                                            focusElement(heightRef);
                                        } else if (e.key === 'ArrowUp') {
                                            e.preventDefault();
                                            focusElement(ageRef);
                                        }
                                    }
                                }),
                                React.createElement('label', { htmlFor: 'female' }, 'Female')
                            )
                        )
                    ),
                    
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'height' }, 'Height'),
                        React.createElement('div', { className: 'input-row' },
                            React.createElement('input', {
                                type: 'number',
                                id: 'height',
                                name: 'height',
                                value: formData.height,
                                onChange: handleInputChange,
                                className: 'input-field',
                                ref: heightRef,
                                onKeyDown: (e) => handleKeyNav(e, genderRef, weightRef)
                            }),
                            React.createElement('select', { id: 'height-unit', className: 'unit-select' },
                                React.createElement('option', { value: 'cm' }, 'cm')
                            )
                        )
                    ),
                    
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { htmlFor: 'weight' }, 'Weight'),
                        React.createElement('div', { className: 'input-row' },
                            React.createElement('input', {
                                type: 'number',
                                id: 'weight',
                                name: 'weight',
                                value: formData.weight,
                                onChange: handleInputChange,
                                className: 'input-field',
                                ref: weightRef,
                                onKeyDown: (e) => handleKeyNav(e, heightRef, activityRef)
                            }),
                            React.createElement('select', { id: 'weight-unit', className: 'unit-select' },
                                React.createElement('option', { value: 'kg' }, 'kg')
                            )
                        )
                    ),
                    
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', null, 'Activity'),
                        React.createElement('select', {
                            id: 'activity',
                            name: 'activity',
                            value: formData.activity,
                            onChange: handleInputChange,
                            ref: activityRef,
                            onKeyDown: (e) => handleKeyNav(e, weightRef, goalRef)
                        },
                            React.createElement('option', { value: '1.2' }, 'Sedentary: little or no exercise'),
                            React.createElement('option', { value: '1.375' }, 'Light: exercise 1-3 times/week'),
                            React.createElement('option', { value: '1.55' }, 'Moderate: exercise 4-5 times/week'),
                            React.createElement('option', { value: '1.725' }, 'Active: daily exercise or intense exercise 3-4 times/week'),
                            React.createElement('option', { value: '1.9' }, 'Very Active: intense exercise 6-7 times/week')
                        ),
                        React.createElement('div', { className: 'exercise-note' }, 'Exercise: 15-20 minutes of elevated heart rate activity.')
                    ),
                    
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', null, 'Your Goal'),
                        React.createElement('div', { className: 'radio-group' },
                            React.createElement('div', { className: 'radio-option' },
                                React.createElement('input', {
                                    type: 'radio',
                                    id: 'maintain',
                                    name: 'goal',
                                    value: 'maintain',
                                    checked: formData.goal === 'maintain',
                                    onChange: handleInputChange,
                                    ref: goalRef,
                                    onKeyDown: (e) => {
                                        if (e.key === 'Enter' || e.key === 'ArrowDown') {
                                            e.preventDefault();
                                            setFormData(prev=>({ ...prev, goal: 'maintain' }));
                                            focusElement(calculateRef);
                                        } else if (e.key === 'ArrowUp') {
                                            e.preventDefault();
                                            focusElement(activityRef);
                                        }
                                    }
                                }),
                                React.createElement('label', { htmlFor: 'maintain' }, 'Maintain weight')
                            ),
                            React.createElement('div', { className: 'radio-option' },
                                React.createElement('input', {
                                    type: 'radio',
                                    id: 'lose',
                                    name: 'goal',
                                    value: 'lose',
                                    checked: formData.goal === 'lose',
                                    onChange: handleInputChange,
                                    onKeyDown: (e) => {
                                        if (e.key === 'Enter' || e.key === 'ArrowDown') {
                                            e.preventDefault();
                                            setFormData(prev=>({ ...prev, goal: 'lose' }));
                                            focusElement(calculateRef);
                                        } else if (e.key === 'ArrowUp') {
                                            e.preventDefault();
                                            focusElement(activityRef);
                                        }
                                    }
                                }),
                                React.createElement('label', { htmlFor: 'lose' }, 'Lose weight')
                            ),
                            React.createElement('div', { className: 'radio-option' },
                                React.createElement('input', {
                                    type: 'radio',
                                    id: 'gain',
                                    name: 'goal',
                                    value: 'gain',
                                    checked: formData.goal === 'gain',
                                    onChange: handleInputChange,
                                    onKeyDown: (e) => {
                                        if (e.key === 'Enter' || e.key === 'ArrowDown') {
                                            e.preventDefault();
                                            setFormData(prev=>({ ...prev, goal: 'gain' }));
                                            focusElement(calculateRef);
                                        } else if (e.key === 'ArrowUp') {
                                            e.preventDefault();
                                            focusElement(activityRef);
                                        }
                                    }
                                }),
                                React.createElement('label', { htmlFor: 'gain' }, 'Gain weight')
                            )
                        )
                    ),
                    
                    null,
                    
                    React.createElement('div', { className: 'button-group' },
                        React.createElement('button', { 
                            className: 'calculate-btn', 
                            onClick: calculateNutrition,
                            ref: calculateRef,
                            onKeyDown: (e) => {
                                if (e.key === 'Enter') { e.preventDefault(); calculateNutrition(); focusElement(clearRef); }
                                else if (e.key === 'ArrowDown') { e.preventDefault(); focusElement(clearRef); }
                                else if (e.key === 'ArrowUp') { e.preventDefault(); focusElement(goalRef); }
                            }
                        }, 'Calculate'),
                        React.createElement('button', { 
                            className: 'clear-btn', 
                            onClick: clearForm,
                            ref: clearRef,
                            onKeyDown: (e) => {
                                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); clearForm(); }
                                else if (e.key === 'ArrowUp') { e.preventDefault(); focusElement(calculateRef); }
                            }
                        }, 'Clear')
                        ,React.createElement('button', {
                            className: 'next-btn',
                            onClick: saveProfile,
                            onKeyDown: (e) => {
                                if (e.key === 'Enter') { e.preventDefault(); saveProfile(); }
                                else if (e.key === 'ArrowUp') { e.preventDefault(); focusElement(calculateRef); }
                            }
                        }, 'Next')
                    )
                ),
                
                React.createElement('div', { className: 'result-section' },
                    React.createElement('div', { className: 'diet-types' },
                        ['balanced', 'high-protein'].map(function(type) {
                            return React.createElement('div', {
                                key: type,
                                className: 'diet-type ' + (dietType === type ? 'active' : ''),
                                onClick: function() { handleDietTypeChange(type); }
                            }, formatDietTypeName(type));
                        })
                    ),
                    
                    React.createElement('div', { id: 'results' },
                        React.createElement('div', { className: 'result-box' },
                            React.createElement('div', { className: 'result-title' }, 'Protein'),
                            React.createElement('div', { className: 'result-item' },
                                React.createElement('span', { className: 'result-label' }, results.protein.value + ' grams/day')
                            ),
                            React.createElement('div', { className: 'result-range' }, 'Range: ' + results.protein.range)
                        ),
                        
                        React.createElement('div', { className: 'result-box' },
                            React.createElement('div', { className: 'result-title' }, 'Carbs'),
                            React.createElement('div', { className: 'result-item' },
                                React.createElement('span', { className: 'result-label' }, results.carbs.value + ' grams/day')
                            ),
                            React.createElement('div', { className: 'result-range' }, 'Range: ' + results.carbs.range),
                            
                            
                        ),
                        
                        React.createElement('div', { className: 'result-box' },
                            React.createElement('div', { className: 'result-title' }, 'Fat'),
                            React.createElement('div', { className: 'result-item' },
                                React.createElement('span', { className: 'result-label' }, results.fat.value + ' grams/day')
                            ),
                            React.createElement('div', { className: 'result-range' }, 'Range: ' + results.fat.range),
                            React.createElement('div', { className: 'result-item', style: { marginTop: '10px' } },
                                React.createElement('span', { className: 'result-label' }, 'Includes Saturated Fat')
                            )
                        ),
                        
                        
                        
                        React.createElement('div', { className: 'result-box' },
                            React.createElement('div', { className: 'result-title' }, 'Food Energy'),
                            React.createElement('div', { className: 'result-item' },
                                React.createElement('span', { className: 'result-label' }, results.calories.toLocaleString() + ' Calories/day')
                            ),
                            React.createElement('div', { className: 'result-item' },
                                React.createElement('span', { className: 'result-label' }, 'or ' + results.kj.toLocaleString() + ' kJ/day')
                            )
                        )
                    ),
                    
                    React.createElement('div', { className: 'note' },
                        React.createElement('p', null,
                            'The results above are a guideline for more typical situations. Please consult with a doctor for your macronutrient needs if you are an athlete, training for a specific purpose, or on special diet due to a disease, pregnancy, or other conditions. The protein range is calculated based on the guidelines set by the American Dietetic Association (ADA), The Centers for Disease Control and Prevention (CDC), and the World Health Organization. The carbohydrate range is based on the guidelines and joint recommendations of The Institute of Medicine, The Food and Agriculture Organization and the World Health Organization.'
                        )
                    )
                )
            )
        )
    );
};

export default NutritionCalculator;