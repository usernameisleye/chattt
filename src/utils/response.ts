export default
{
    error: (msg: string) => {
        return {
            msg,
            success: false
        }
    },

    success: (msg: string, data) => {
        return {
            msg,
            success: true,
            data
        }
    },

    validations: (errors) => {
        return {
            errors,
            success: false
        }
    },
}