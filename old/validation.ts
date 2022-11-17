export const submitData = async (url: any, method:any, data:any, contentType =  'application/json') =>{
    const res = await fetch(url,{
        method: method,
        headers: {
            'Content-Type': contentType
        },
        body: data
    })

    if (res.status === 200){
        return true
    }
    return false
}

export interface Field{
    name: any
    email: any
    comments: any
}

export const validate = (e:any) => {
   if (e.type === 'submit') {
    const errors: Field = {
        name: '',
        email: '',
        comments: ''
    }
    errors.name = validate_name
    errors.email = validate_email
    errors.comments = validate_comments
    return errors

   } else {
        const {id, value} = e.target
        switch(id) {
            case 'name':
                return validate_name(value)
            case 'email':
                return validate_email(value)
            case 'comments':
                return validate_comments(value)
        }
   }
}


const validate_name = (value:any) => {
    if (!value)
        return 'Name is required'
    else if (value.length < 2)
        return 'Your name must contain atleast 2 characters'
    else
        return null
}

const validate_email = (value:any) => {
    const regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if (!value)
        return 'An email address is required'
    else if (!regex_email.test(value))
        return 'Must be a valid email address example(email@domain.com)'
    else
        return null
}

const validate_comments = (value:any) => {
    if (!value)
        return 'A comment is required'
    else if (value.length < 5)
        return 'Your comment must be at least 5 characters long'
    else
        return null
}