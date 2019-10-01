import axios from "axios";

const url = "http://localhost:5000";

export const getAllSlides = async () => {
  try {
    const slidesData = await axios.get(`${url}/api/slides`);
    return slidesData.data;
  } catch (e) {
    console.error(e);
  }
};

export const createNewSlide = async text => {
  try {
    const newSlide = await axios.post(`${url}/api/slide`, { text });
    return newSlide;
  } catch (e) {
    console.error(e);
  }
};

export const updateSlide = async (id, val) => {
  try {
    const updateSlide = await axios.put(`${url}/api/slide/${id}`, {
      val
    });
    return updateSlide;
  } catch (e) {
    console.error(e);
  }
};
