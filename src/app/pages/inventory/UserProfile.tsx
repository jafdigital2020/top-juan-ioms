
import PersonalDataForm from "@/app/_components/account/personal-info";
import UserProfile from "@/app/_components/account/user-profile";


import React from "react";

const UserProfilePage: React.FC = () => {
  return (
    <section className="container mx-auto p-4 ">
    <div className="user-profile-page flex flex-col lg:flex-row">
      <div className="left-section w-full lg:w-1/3 p-4">
        <UserProfile
          name="John Dimacuha"
          role="Employee"
          profilePicture="https://avatars.githubusercontent.com/u/124599?v=4"
        />
      </div>
      <div className="right-section w-full lg:w-2/3 p-4">
        <PersonalDataForm />
       
      </div>
    </div>
   </section>
   
  );
};

export default UserProfilePage;
