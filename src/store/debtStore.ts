import { create } from "zustand";
import { axiosRequest } from "../utils/axios";


export const useDebtStore = create((set) => ({

  user: null,

  debts: [],

  folders: [],

  contacts: [],

  loading: false,



  fetchUser: async () => {

    try {

      set({loading:true});


      const {data} = await axiosRequest.get(
        "/users/me"
      );


      set({
        user:data
      });


    } catch(error){

      console.log(
        error.response?.data || error
      );

    } finally {

      set({
        loading:false
      });

    }

  },


  fetchFolders: async()=>{
    try{
      set({loading:true});
      const {data}=await axiosRequest.get(
        "/folders"
      );
      set({
        folders:data
      });
    }catch(error){

      console.log(
        error.response?.data || error
      );

    }finally{

      set({
        loading:false
      });

    }

  },




  // ================= DEBTS =================


  addDebt: async(payload)=>{


    try{


      set({
        loading:true
      });


      const {data}= await axiosRequest.post(
        "/debts",
        payload
      );


      set((state)=>({

        debts:[
          data.data ?? data,
          ...state.debts
        ]

      }));


      return data;



    }catch(error){


      console.log(
        error.response?.data || error
      );


      throw error;



    }finally{


      set({
        loading:false
      });


    }

  },





  deleteDebt:async(id)=>{


    try{


      await axiosRequest.delete(
        `/debts/${id}`
      );



      set((state)=>({

        debts:
        state.debts.filter(
          item=>item.id!==id
        )

      }));



    }catch(error){

      console.log(
        error.response?.data || error
      );

    }


  },





  updateDebt:async(id,payload)=>{


    try{


      const {data}=await axiosRequest.patch(

        `/debts/${id}`,

        payload

      );



      set((state)=>({

        debts:

        state.debts.map(
          item=>
          item.id===id
          ?
          data
          :
          item
        )

      }));



    }catch(error){

      console.log(
        error.response?.data || error
      );

    }


  },






  // ================= CONTACTS =================


  addContact:async(payload)=>{


    try{


      set({
        loading:true
      });



      const {data}=await axiosRequest.post(

        "/contacts",

        payload

      );



      set((state)=>({

        contacts:[

          data,

          ...state.contacts

        ]

      }));


      return data;



    }catch(error){


      console.log(
        error.response?.data || error
      );


      throw error;


    }finally{


      set({
        loading:false
      });


    }


  },





  fetchContacts:async()=>{


    try{


      const {data}=await axiosRequest.get(

        "/contacts"

      );


      set({

        contacts:data

      });



    }catch(error){

      console.log(
        error.response?.data || error
      );

    }


  },







  // ================= AUTH =================



  logout:async()=>{


    try{


      const refreshToken =
      localStorage.getItem(
        "refreshToken"
      );



      await axiosRequest.post(

        "/auth/logout",

        {
          refreshToken
        }

      );



      localStorage.clear();



      set({

        user:null,

        debts:[],

        folders:[],

        contacts:[]

      });



    }catch(error){


      console.log(
        error.response?.data || error
      );


    }


  },







  refreshToken:async()=>{


    try{


      const refreshToken =
      localStorage.getItem(
        "refreshToken"
      );



      const {data}=await axiosRequest.post(

        "/auth/refresh",

        {
          refreshToken
        }

      );



      localStorage.setItem(

        "accessToken",

        data.accessToken

      );



      localStorage.setItem(

        "refreshToken",

        data.refreshToken

      );



    }catch(error){


      console.log(
        error.response?.data || error
      );


    }


  }


}));