import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { GlobeAmericasIcon } from "@heroicons/react/24/solid";




const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <div className="h-screen">
      <Head>
        <title>Home | Housing Prices Tracker</title>
      </Head>
      <Header />
      <main>
        <section className="flex flex-col items-center justify-center bg-white my-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Track Housing Prices with Ease
          </h2>
          <p className="text-gray-700 mb-8 text-center max-w-2xl">
            Welcome to our real estate analytics app! Our app is designed to
            help you make informed decisions about the housing market by
            providing up-to-date data and analysis of home prices in various
            areas.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </section>
        <section className="bg-gray-50 py-8">
          <div className="w-10/12 mx-auto grid grid-cols-3 gap-x-8">
            <div className="flex flex-row items-center text-gray-700 mb-8 bg-white shadow px-8 py-4 rounded h-36 min-h-full">
              <div className="">
                <ArrowTrendingUpIcon className="w-12 h-12256  mr-12" />
              </div>
              <p>
                Our app collects data from a variety of sources, including
                Zillow, Redfin, and local sales data, and organizes it in a
                meaningful way. 
              </p>
            </div>
            <div className="flex flex-row items-center text-gray-700 mb-8 bg-white shadow px-8 py-4 rounded  h-48 min-h-full">
              <div className="">
                <MagnifyingGlassIcon className="w-12 h-12256  mr-12" />
              </div>

              <p>
                Our app includes a range of powerful tools to help you explore
                the data, including interactive graphs and maps that allow you
                to visualize home prices and trends over time. 
              </p>
            </div>

            <div className="flex flex-row items-center text-gray-700 mb-8 bg-white shadow px-8 py-4 rounded  h-48 min-h-full">
              <div className="">
                <GlobeAmericasIcon className="w-12 h-12256  mr-12" />
              </div>

              <p>
                Based on our analysis of the data, our app provides personalized
                recommendations on the best areas to buy, along with valuable
                insights into market trends and predictions for future price
                changes.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
