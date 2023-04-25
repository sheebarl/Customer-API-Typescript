"use strict";
class customerDetails {
    constructor(custid, custname, custaddr, custphno) {
        this.custid = custid;
        this.custname = custname;
        this.custaddr = custaddr;
        this.custphno = custphno;
    }
}
class CustomerState {
    constructor() {
        this.customer = [];
        this.listeners = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new CustomerState();
        return this.instance;
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
    addCustomer(custid, custname, custaddr, custphno) {
        const customerdetails = new customerDetails(custid, custname, custaddr, custphno);
        this.customer.push(customerdetails);
        for (const listenerFn of this.listeners) {
            listenerFn(this.customer);
        }
    }
}
const customerState = CustomerState.getInstance();
class customerInput {
    constructor() {
        this.FormEl = document.querySelector('form');
        this.custidEl = document.getElementById('ID');
        this.custnameEl = document.getElementById('Name');
        this.custaddrEl = document.getElementById('addr');
        this.custphnoEl = document.getElementById('phno');
        this.configure();
    }
    configure() {
        // this.FormEl.addEventListener('submit',this.submitHandler.bind(this));
        this.FormEl.addEventListener('submit', this.submitHandler.bind(this));
    }
    submitHandler(event) {
        event.preventDefault();
        const custid = this.custidEl.value;
        const custname = this.custnameEl.value;
        const custaddr = this.custaddrEl.value;
        const custphno = +this.custphnoEl.value;
        console.log(custid, custname, custaddr, custphno);
        //this.gatherUserInput();
        customerState.addCustomer(custid, custname, custaddr, custphno);
    }
    gatherUserInput() {
        const custid = this.custidEl.value;
        const custname = this.custnameEl.value;
        const custaddr = this.custaddrEl.value;
        const custphno = +this.custphnoEl.value;
        return [custid, custname, custaddr, custphno];
    }
}
class customerList {
    constructor() {
        this.assignedCustomers = [];
        customerState.addListener((customer) => {
            this.assignedCustomers = customer;
            this.renderCustomer();
        });
    }
    renderCustomer() {
        const listEl = document.getElementById('CustomerList');
        for (const customer of this.assignedCustomers) {
            const listItem = document.createElement('li');
            listItem.innerHTML = customer.custid;
            listItem.innerHTML = customer.custname;
            listItem.innerHTML = customer.custaddr;
            listItem.innerHTML = " " + customer.custphno;
            console.log(listItem);
            listEl.appendChild(listItem);
        }
    }
}
const input = new customerInput();
const customerlist = new customerList();
//function autobind(target:any, name:string, descriptor:PropertyDescriptor) :PropertyDescriptor {
//     const originalmethod=descriptor.value;
//     const newDescriptor:PropertyDescriptor = {
//         configurable:true,
//         get(){
//             return originalmethod.bind(this);
//         },
//     };
//     return newDescriptor;
// }
// public getDetails(){
//     const cust_id=(document.getElementById('ID') as HTMLInputElement).value;
//     const cust_name=(document.getElementById('Name') as HTMLInputElement).value;
//     const cust_addr=(document.getElementById('addr') as HTMLInputElement).value;
//     const cust_phno=(document.getElementById('phno') as HTMLInputElement).value;
// }
// private invokeAPI(data:any){
//     const xhr=new XMLHttpRequest();
//     xhr.open('POST','');
//     xhr.send(data);
//     xhr.onload=this.successAlert;
// }
// private successAlert(){
//     window.alert("Customer Successfully added")
// }
// function submitCustomerDetails(){
//     const c:customerDetails=new customerDetails();
//     c.getDetails();
// }
