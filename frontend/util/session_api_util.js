export const signUp = user => {
    
    return(
        $.ajax({
            url: `/api/users`,
            method: 'post',
            data: { user }
        })
    )
}

export const logIn = user => {
    
    return $.ajax({
            url: `/api/session`,
            method: 'post',
            data: { user }
        })
    
}

export const logOut = () => {
    
    return(
        $.ajax({
            url: `/api/session`,
            method: 'delete'
        })
    )
}