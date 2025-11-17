import { BASEURL} from './config';

// lookups Meal Category
export const getAllMealCategory=`${BASEURL}/meals/lookups/mealCategory/getAll`
export const AddMealCategroy=`${BASEURL}/meals/lookups/mealCategory/add`
export const IndividualCategory=`${BASEURL}/meals/lookups/mealCategory/getcategory` //get id required
export const UpdateMealCategory=`${BASEURL}/meals/lookups/mealCategory/update` //patch id required
export const deleteMealCategory=`${BASEURL}/meals/lookups/mealCategory/delete` //delete id required


// lookups Measurement
export const getAllMealMeasurement=`${BASEURL}/meals/lookups/mealMeasurement/getAll`
export const AddMealMeasurement=`${BASEURL}/meals/lookups/mealMeasurement/add`
export const IndividualMealMeasurement=`${BASEURL}/meals/lookups/mealMeasurement/getMesurement` //get id required
export const UpdateMealMeasurement=`${BASEURL}/meals/lookups/mealMeasurement/update` //patch id required
export const deleteMealMeasurement=`${BASEURL}/meals/lookups/mealMeasurement/delete` //delete id required


// Clients
export const getAllClients=`${BASEURL}/clients/getallclients`
export const AddClients=`${BASEURL}/clients/addclient`
export const IndividualClient=`${BASEURL}/clients/getclient` //get id required
export const UpdateClient=`${BASEURL}/clients/updateclient` //patch id required
export const deleteClient=`${BASEURL}/clients/deleteclient` //delete id required
