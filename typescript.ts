const num1ele=document.getElementById('num1') as HTMLInputElement
const num2ele=document.getElementById('num2') as HTMLInputElement
const button =document.querySelector('button')!;
const resultnum:Array<number>=[]
const stringout:Array<string>=[]
type numorstr= number |string

interface object1{
val:number;
strapon:Date
}
function add(num1:numorstr,num2:numorstr)
{
   if(typeof num1==='number' && typeof num2==='number')
   {
      return num1 + num2;
   }
   else if(typeof num1==='string' &&typeof num2==='string')
   {
      return num1+'  '+ num2;
   }
   return +num1 + +num2;
}
function printresult(resultobj:object1)
{
   console.log(resultobj)
}
button.addEventListener("click", ()=>{
   const num1=num1ele.value
   const num2=num2ele.value
   const result =add(+num1,+num2) 
   const stringval=add(num1,num2)
   console.log(result)
   console.log(stringval)
   printresult({val:result as number,strapon: new Date()})
   resultnum.push(result as number)
   stringout.push(stringval as string)
   console.log(resultnum,stringout)
});

 const promise=new Promise<string>((resolve, reject) => {
     setTimeout(()=>{
     resolve('solve') 
     },5000)
 })
   promise.then(result=>{
      console.log(result)
   })
