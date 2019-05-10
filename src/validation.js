const isValid = (email,handleError) => {
    let error = null;

    if(isEmail(email)){
        error = `${email} is not a valid email address.`;
    }
    if (isInList(email)) {
        error = `${email} has already been added.`;
    }
    if (error) {
        handleError({ error });
        return false;
    }
    
    return true;
}

const isEmail = email => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
}

const isInList = email => {
    return this.state.items.includes(email);
}

export default isValid;