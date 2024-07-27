import supabase from "./supabase";
import {UAParser} from "ua-parser-js";

export async function getClicksForUrls(urlId) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlId);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load");
  }

  return data;
}

// The .in() method is used to filter rows where a column's value is in a given list of values.
//  .in(column, arrayOfValues)
// Use .in() when you want to match any value from a list of possible values.


const parser = new UAParser();

export const storeClicks = async ({id, originalUrl}) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop"; // Default to desktop if type is not detected

    const response = await fetch("https://ipapi.co/json");
    const {city, country_name: country} = await response.json();

    // Record the click
    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    // Redirect to the original URL
    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error recording click:", error);
  }
};


export async function getClicksForUrl(url_id) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
}