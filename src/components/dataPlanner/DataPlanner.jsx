import React,{useState ,useEffect } from 'react'
import "./DataPlanner.css";
import { AiFillStar } from "react-icons/ai";
import { useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


// import actions from redux
import {setCity,setLoading,setError,setCityPlaces} from "../../reduxStructure/slices/cityDataSlice"
import { addItemToSelectedDay , initPlanner } from '../../reduxStructure/slices/plannerSlice';

import { Commet } from "react-loading-indicators";





function DataPlanner({setSelectedItem}) {

  const dispatch = useDispatch();
  const error =useSelector(state =>state.cityData.error)
  const loading = useSelector(state => state.cityData.loading)
  console.log(error)
  // get city name from url params and set it to redux state
  const params = useParams();
  const nameCity = (params.cityName || "").trim();


  // saved data from api
  const [places, setPlaces] = useState({
    hotels: [],
    activities: [],
    restaurants: [],
    allData: [],
  });




  // api keys 
  const RAPID_KEY = 'b183c922b4msh310f3073e7c626fp1b0201jsnac2d64e3af51';
  const API_HOST = "apidojo-booking-v1.p.rapidapi.com";

  // api he is need dates in format YYYY-MM-DD,
  const date=new Date()

  // we set new date to be in the next month 
  const nextMonth = (date.getMonth() + 2).toString().padStart(2, '0')
  const dates = { arrival: `${date.getFullYear()}-${nextMonth==="13"?"01":nextMonth}-05`, departure: `${date.getFullYear()}-${nextMonth==="13"?"01":nextMonth}-06` };


  // --- helpers ---
 

  function fallbackDescription(item, cityName = "") {
    const name = item?.name || "This place";
    const city = cityName ? ` in ${cityName}` : "";
    const rating = item?.rating ? ` Rated ${item.rating}/5.` : "";

    const byCategory = {
      Hotel: `${name}${city} is a comfortable and well-located hotel ideal for short or long stays.${rating} Perfect for travelers looking for convenience and quality service.`,
      
      Restaurant: `${name}${city} offers a delightful dining experience with a welcoming atmosphere.${rating} A great choice to enjoy local and international cuisine.`,
      
      Activity: `${name}${city} is a popular attraction worth exploring.${rating} Ideal for visitors looking to discover unique experiences and memorable moments.`,
    };

    return byCategory[item?.category] || `${name}${city} is a recommended spot for visitors.${rating}`;
  }

// fetch location_id, lat and lon using city name
  async function getLocation(nameCity) {

    const url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${nameCity}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`;
    
    const res = await fetch(url, {
      headers: {
        "x-rapidapi-key": RAPID_KEY,
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      },
    });

    const info = await res.json();
    
    if (!info?.data?.length) throw new Error("City not found 1");

    // we return location_id, lat and lon because we will need them to fetch both restaurants and activities
    return {location_id: info.data[0].result_object?.location_id, lat: info.data[0].result_object?.latitude, lon: info.data[0].result_object?.longitude};
  }

// fetch Restaurants using lat and lon fom getLocation function
  async function getRestaurants(nameCity) {
  const { lat, lon } = await getLocation(nameCity);

  const res = await fetch(
    `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${lon}&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US`,
    {
      headers: {
        "x-rapidapi-key":RAPID_KEY,
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      },
    }
  );

  const data = await res.json();

  // clean data 
  return (data.data || []) //verify data exists
    .filter(item => item.name && item.rating && item.location_id && item.price_level&&item.photo) 
    .map(item => ({
      id: item.location_id,
      name: item.name,
      lat: Number(item.latitude),
      lng: Number(item.longitude),
      rating: item.rating ? Number(item.rating) : null,
      reviews:item.num_reviews,
      address: item.location_string || "",
      image: item.photo?.images?.medium?.url || "",
      category: "Restaurant",
      description: item.description?.trim() || fallbackDescription(
        { name: item.name, rating: item.rating, category: "Restaurant" },
        nameCity
      ),
      price: Number(priceText(item.price_level)),
    }));
}

// we need to transform the price level from the api to a text that we can display to the user
function priceText(level) {
  if (!level) return "Unknown";

  const map = {
    "$":50 ,
    "$$": 110 ,
    "$$$": 225 ,
    "$$$$": 350 ,
    "$ - $$": 90 ,
    "$$ - $$$": 185 ,
    "$$$ - $$$$": 275 ,
  };
  return map[level] || level;
}

// fetch activities using location_id from getLocation function
 async function getActivities(nameCity) {
  const { location_id } = await getLocation(nameCity);

  const res = await fetch(
    `https://travel-advisor.p.rapidapi.com/attractions/list?location_id=${location_id}&currency=USD&lang=en_US&lunit=km&sort=recommended`,
    {
      headers: {
        "x-rapidapi-key": RAPID_KEY,
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      },
    }
  );

  const data = await res.json();

  // clean data 
  return (data.data || []) 
    .filter(item => item.name && item.rating && item.location_id && item.photo) 
    .map(item => ({
      id: item.location_id,
      name: item.name,
      lat: Number(item.latitude),
      lng: Number(item.longitude),
      rating: item.rating ? Number(item.rating) : null,
      reviews:item.num_reviews,
      address: item.location_string || "",
      image: item.photo?.images?.medium?.url ||"",
      category: "Activity",
      description: item.description?.trim() || fallbackDescription(
        { name: item.name, rating: item.rating, category: "Activity" },
        nameCity
      ),
      price: 0,
    }));
}

// fetch hotels using the booking api
 async function bookingGetHotels(cityName) {
    const headers = {
      "x-rapidapi-key": RAPID_KEY,
      "x-rapidapi-host": API_HOST,
    };

    // first we need to get the dest_id for the city from the auto-complete endpoint
    const locRes = await fetch(
      `https://${API_HOST}/locations/auto-complete?text=${encodeURIComponent(cityName)}&languagecode=en-us`,
      { headers }
    );
    const locData = await locRes.json();

    // we take the item with the most hotels to get the dest_id,
    const biggestItem = locData.reduce((max, item) =>
      item.hotels > max.hotels ? item : max
    );

    const destId = biggestItem?.dest_id ;
    if (!destId) throw new Error("No dest_id found for this city.");

    // build params using the dest_id and the dates we set before
    const params = {
      offset: 0,
      arrival_date: dates.arrival,
      departure_date: dates.departure,
      guest_qty: 1,
      children_qty: 2,
      children_age: "5,7",
      dest_ids: destId,
      room_qty: 1,
      search_type: "city",
      search_id: "",
      price_filter_currencycode: "MAD",
      order_by: "popularity",
      languagecode: "en-us",
      travel_purpose: "leisure",
    };
    // we need to transform the params object to a query string to send it to the api
    const query = new URLSearchParams(params).toString();

    const hotelRes = await fetch(`https://${API_HOST}/properties/list?${query}`, { headers });

    const hotelData = await hotelRes.json();
    
    // clean data 
    return (hotelData.result || []).filter(item => item.main_photo_url).map(item => {
        // transform price to a number and convert it to MAD
        
        const getPriceValue = () => {
          const currency = item.currencycode;
          if (currency === "USD") return item.min_total_price*10; 
          else if (currency === "EUR") return item.min_total_price*11;
          else if (currency === "MAD") return item.min_total_price;
          return item.min_total_price;
        }
      return ({
      id: item.hotel_id,
      name: item.hotel_name,
      lat: Number(item.latitude),
      lng: Number(item.longitude),
      rating: item.review_score ? Number((item.review_score/2).toFixed(1)): null,
      reviews:item.review_nr,
      address: item.address || "",
      image: item.main_photo_url?.replace("/square60/", "/max500/") || "",
      category: "Hotel",
      price: Number(getPriceValue().toFixed(2)),
      description: item.description?.trim() || fallbackDescription(
        { name: item.name, rating: item.rating, category: "Hotel" },
        nameCity
      ),
      destId: destId, // we seave destId to using it in the next search 
    })});
  }

  // we need to build a single array with all the data and we need mixed [h1, r1,a1, a2, h2, r2, a3,...] for section "All"
  function buildAllData({ hotels, activities, restaurants }) {
    return [
      ...hotels,
      ...activities,
      ...restaurants,
    ].sort(() => Math.random() - 0.5);
  }


  // --- main ---
  const handleSearch = async () => {
    // reset error
    dispatch(setError(""));

    if (!nameCity.trim()) return dispatch(setError("Please enter a city name"));
    if (!RAPID_KEY) return dispatch(setError("Missing Booking API key"));
    //  playr loading
    dispatch(setLoading(true));

    try {
      
      // fetch hotels from booking api
      const  hotels  = await bookingGetHotels(nameCity);

      // fetch restaurants from travel advisor api
      const restaurants  = await getRestaurants(nameCity);

      // fetch activities from travel advisor api
      const activities  = await getActivities(nameCity);

      // build all data for section "All"
      const allData = buildAllData({ hotels, activities, restaurants });

      // remplace places with the new data
      setPlaces({
        hotels,
        activities,
        restaurants,
        allData,
      });
      dispatch(setCityPlaces( {allData:allData} ))

    } catch (error) {
      dispatch(setError(typeof error?.message === "string" ? error.message : " An error occurred while fetching data."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  // seave city name to redux state 
  useEffect(() => {
    if (nameCity) dispatch(setCity(nameCity));
    dispatch(initPlanner());
    handleSearch();
  }, [nameCity]);

  

  



  const [type,setType]=useState("All");
  
  const data = (() => {
    if(type==="All") return places.allData;
    if(type==="Hotels") return places.hotels;
    if(type==="Restaurants") return places.restaurants;
    if(type==="Activities") return places.activities;
  })();

  
  // this index for pagination 
  const [index,setIndex]=useState(0)
  const nbPages=Math.ceil(data.length/9)


  return (
    <div className='dataPlanner'>
     

      <div className='tripInfos'>
        <h3> {nameCity.toUpperCase()}</h3>
        <p>Discover the magic of {nameCity} .Select activities to build your itinerary</p>
      </div>

      <div className='types'>
        <button className={type=="All" ? "active" :""} onClick={()=>{setType("All");setIndex(0)}}>All</button>
        <button className={type=="Hotels" ? "active" :""}  onClick={()=>{setType("Hotels");setIndex(0)}}>Hotels</button>
        <button className={type=="Restaurants" ? "active" :""}  onClick={()=>{setType("Restaurants");setIndex(0)}}>Restaurants</button>
        <button className={type=="Activities" ? "active" :""}  onClick={()=>{setType("Activities");setIndex(0)}}>Activities</button>

      </div>

      <div className='line'></div>

      <div className='dataCards'>
        {loading &&(
          <div className='section_loading'>
            <Commet
            color="#42a7c3"
            size="large"
            text=""
            textColor=""
          />
          </div>
        )}
        {!loading &&(data.slice(index,index+9) || []).map((item)=>{
          
          return (
            <div key={item.id} className='dataCard'>
              <div className='image' style={{backgroundImage: `url(${item.image})`}}>

              </div>
              <span className='type' onClick={()=>setSelectedItem({id:item.id,category:item.category})}>view</span>
              <div className='review'>
                <div className='star' ><AiFillStar /> </div>
                <div className='ra9m'>{item.rating} </div>
              </div>
              <div className='dataInfos'>
                <h3 className='nomee'>{item.name}</h3>
                <p>{item.category}</p>
                <div className='footerInfos'>
                  <h3 className='pri'>
                    {item.category === "Hotel" && item.price+" MAD" }
                    {item.category === "Activity" && "Free" }
                    {item.category === "Restaurant" && ""+item.price+" MAD" } 
                    </h3>
                  <button onClick={() => dispatch(addItemToSelectedDay(item))}>Add to trip</button>
                </div>
              </div>

            </div>
          )
         })}

         {!loading && (<div className='pagination'>
            <button className='Pre' disabled={index===0} onClick={()=>setIndex(p =>p-9)}>Previous</button>
            {[...Array(nbPages)].map((_,i)=><button className={(index/9)==i&&"activePage"} key={i} onClick={()=>setIndex(9*Number(i))}>{i+1}</button>)}
            <button className='Next' disabled={index===9*(nbPages-1)} onClick={()=>setIndex(p =>p+9)}>Next</button>
         </div>
        )}

      </div>

    </div>
  )
}

export default DataPlanner
