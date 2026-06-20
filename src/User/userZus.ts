import { create } from "zustand";
import { axiosRequest } from "../utils/axios";


interface Profile {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
}


interface ProfileStore {

  profile: Profile | null;

  getProfile: () => Promise<void>;

  updateProfile: (profile: Partial<Profile>) => Promise<void>;

  logout: () => void;

}


const useProfileStore = create<ProfileStore>((set) => ({

  profile: null,


  getProfile: async () => {

    try {

      const {data} = await axiosRequest.get("/users/me");

      set({
        profile:data
      });

    } catch(error){

      console.log(error);

    }

  },


  updateProfile: async(profile)=>{

    try{

      const {data}=await axiosRequest.patch(
        "/users/me",
        profile
      );

      set({
        profile:data
      });


    }catch(error){

      console.log(error);

    }

  },


  logout:()=>{

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    set({
      profile:null
    });


    window.location.href="/login";

  }


}));


export default useProfileStore;