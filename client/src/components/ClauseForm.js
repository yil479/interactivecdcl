import React from "react";
import '../css/ClauseForm.css';
import { useForm, useField, splitFormProps } from "react-form";

// Regex expression for checking valid clauses w/ potential
// whitespace at beginning or end. Check if it's valid with:
// `validClause.test({ string clause })`
const validClause = /^ *(?:not )?x\d+(?: or (?:not )?x\d+)* *$/;


  
async function fakeCheckValidClause(value, instance) {
    if(!value) {
        return "Clause input field cannot be empty!";
    }

    return instance.debounce(() => {
        if(validClause.test(value)) {
            // All names are valid, so return a false error
            return false;
        }
        else {
            return "Make sure to use all lower case letters, all your variables begin with x, and since it's CNF form, you can only use 'not' and 'or' in your clauses!";
        }   
    }, 500);
}
  
function InputField(props) {
    // Let's use splitFormProps to get form-specific props
    const [field, fieldOptions, rest] = splitFormProps(props);

    // Use the useField hook with a field and field options
    // to access field state
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField(field, fieldOptions);

    // Build the field
    return (
        <>
        <input {...getInputProps({...rest})} />{" "}
        {isValidating ? (
            <em>Validating...</em>
        ) : isTouched && error ? (
            <em>{error}</em>
        ) : null}
        </>
    );
}

export function ClauseForm(props) {
    // Use the useForm hook to create a form instance
    const {
        Form,
        meta: { isSubmitting, canSubmit }
    } = useForm({
        onSubmit: async (values, instance) => {
            // onSubmit (and everything else in React Form)
            // has async support out-of-the-box
            props.onSubmit(values);
        },
        // debugForm: true
    });

    const inputPlaceHolder = 'e.g. x1 or not x2 or x5'

    // TODO: start with 1 clause and make button to add clauses
    // TODO: define field="{}[0-9]+" as constant since it's also used in app.py

    return (
        <div className="graph-input-container">
            <Form className="form-clauses-container">
                <div>
                    <div className="dynamic-inputs">
                       {props.inputs.map((input, index) => 
                            <label key={input}>
                                Clause {index+1}:&nbsp;
                                <InputField placeholder={inputPlaceHolder} field={input} key={input} validate={fakeCheckValidClause} />
                                <button type="button" onClick={() => props.onDeleteInput(input)}>x</button>
                            </label>
                        )}
                   </div>
                </div>
                <div className="add-input">
                    <button type="button" className="add-button" onClick={props.onAddInput}>
                        +
                    </button>
                </div>
                <div className="submit-form">
                    <button className="submit-button" type="submit" disabled={!canSubmit}>
                        Submit
                    </button>
                    <div>
                        <em>{isSubmitting ? "Submitting..." : null}</em>
                    </div>
                </div>
            </Form>
        </div> 
    );
}
