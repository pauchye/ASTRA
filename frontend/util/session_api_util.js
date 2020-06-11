export const signUp = user => {
    // debugger
    return(
        $.ajax({
            url: `/api/users`,
            method: 'post',
            data: { user }
        })
    )
}

export const logIn = user => {
    // debugger
    return $.ajax({
            url: `/api/session`,
            method: 'post',
            data: { user }
        })
    
}

export const logOut = () => {
    debugger
    return(
        $.ajax({
            url: `/api/session`,
            method: 'delete'
        })
    )
}