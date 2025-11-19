export default class apiResponse{
    constructor(
        statusCode=0,
        message="",
        data
    ){
        this.message=message,
        this.data=data,
        this.status=statusCode
    }
}



// const a=new apiResponse(200,"Ankit DHakad",{name:"Dhakad",age:21,Gender:"Male"})
// console.log(a);