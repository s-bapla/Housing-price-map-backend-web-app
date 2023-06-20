import Header from "@/components/Header";
import SideNav from "@/components/SidNav";
import Cities from "./cities";

const Admin = () => {
  return (
    <div className="bg-gray-50 w-full h-screen">
      <Header />
      <div className="flex flex-row h-screen">
        <SideNav />
        <div className="flex flex-col text-justify ml-32 w-1/2 mt-8">
          <p className="text-lg mt-8">
            This page serves as the hub for managing your website's data. As the
            administrator, you have the ability to add, edit, or delete
            information stored in the database. This includes user accounts,
            posts, products, and any other data relevant to your website's
            content.
          </p>
          <p className="text-lg mt-8">
            In addition to managing data, this page provides access to various
            tools and features that enable you to monitor and maintain the
            overall functionality of your website. You can view site analytics,
            update settings, and troubleshoot any issues that may arise.
          </p>
          <p className="text-lg mt-8">
            Our goal is to provide you with a user-friendly interface that makes
            managing your website's data as easy and efficient as possible. If
            you have any questions or need assistance, please don't hesitate to
            contact us.
          </p>
          <p className="text-lg mt-8">
            Thank you for choosing our platform and we hope that your experience
            using this admin page will be productive and successful.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
