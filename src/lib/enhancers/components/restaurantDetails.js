const extractOpeningHoursFromSlot = ({component}) => {
  const openingHours = component.slots?.openingHours?.map((hours) => {
    return {
      day: hours.parameters.day.value,
      openingTime: hours.parameters.openingTime.value,
      closingTime: hours.parameters.closingTime.value,
    }
  })
  return openingHours;
}

const extractDietsFromSlot = ({component}) => {
  const diets = component.slots?.diets?.map((diet) => {
    return {
      label: diet.parameters.label.value
    }
  })

  return diets;
}

const extractCuisnesFromSlot = ({component}) => {
  const cuisines = component.slots?.cuisines?.map((cuisine) => {
    return {
      label: cuisine.parameters.label.value
    }
  })
  return cuisines;
}

export default function restaurantDetailsEnhancer (component) {

  return component
    .data('openingHours', extractOpeningHoursFromSlot)
    .data('diets', extractDietsFromSlot)
    .data('cuisines', extractCuisnesFromSlot)
}