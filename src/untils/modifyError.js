export const modifyError = (error)=>{
    const result = error.slice(5)
    result.replace("-"," ")
    return result
}