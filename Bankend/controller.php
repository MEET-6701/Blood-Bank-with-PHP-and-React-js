<?php

include_once('model.php');


class control extends model{
    function __construct(){
        model::__construct();

        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        header("Connection: keep-alive");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");

        // Handle preflight OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;  // Exit early for preflight requests
        }
        
        $path=$_SERVER ['PATH_INFO'];
       
        

        switch ($path) {
            case '/test':
                $data=$this->select("donors");
                $data =json_encode($data->fetch_all(MYSQLI_ASSOC));
                echo $data;
                break;

            case '/Req_user':
                    $data=$this->select("request");
                    $data =json_encode($data->fetch_all(MYSQLI_ASSOC));
                    echo $data;
                    break;

            case '/addDonor':
                header("Access-Control-Allow-Origin: *");
                $jsonData = file_get_contents('php://input');
    
                // Decode the JSON data into a PHP array
                $donorData = json_decode($jsonData, true);
            
                // Check if the decoding was successful
                if ($donorData === null) {
                    echo json_encode(['error' => 'Invalid JSON data']);
                    break;
                }

                $name = $donorData['name'] ?? '';
                $blood_Type = $donorData['blood_type'] ?? '';
                $age = $donorData['age'] ?? '';
                $contact = $donorData['contact'] ?? '';
                $address = $donorData['address'] ?? '';

                if (empty($name) || empty($blood_Type) || empty($age) || empty($contact) || empty($address)) {
                    echo json_encode(['error' => 'All fields are required']);
                    break;
                }
                $sql="insert into donors (name, blood_type, age, contact, address) values ('$name','$blood_Type','$age','$contact','$address')";

                $data=$this->insert($sql);

                if ($data != NULL) {
                    // If the donor was successfully added, increase the available blood quantity
                    // Update the available blood table (assuming it has columns 'blood_type' and 'quantity')
                    
                    $updateSql = "UPDATE available_blood SET quantity = quantity + 1 WHERE blood_type = '$blood_Type'";
                
                    // Execute the update query
                    $updateData = $this->update($updateSql);  // Assuming insert() method is used for both insert and update
                
                    if ($updateData != NULL) {
                        // If update is successful, return a success message
                        echo json_encode(['success' => true, 'message' => 'Donor added and available blood quantity updated']);
                    } else {
                        // If updating the available blood fails, return an error message
                        echo json_encode(['error' => 'Failed to update the available blood quantity']);
                    }
                } else {
                    // If the donor was not added successfully, return an error message
                    echo json_encode(['error' => 'Failed to add donor']);
                }
                break;
            
            case '/Login':
                

                header("Access-Control-Allow-Origin: http://localhost:3000/");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        header("Connection: keep-alive");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");

        // Handle preflight OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;  // Exit early for preflight requests
        }
                $jsonData = file_get_contents('php://input');
    
                // Decode the JSON data into a PHP array
                $data1 = json_decode($jsonData, true);

                if ($data1 === null) {
                    echo json_encode(['error' => 'Invalid JSON data']);
                    break;
                }

                $username = $data1['username'] ?? '';
                $password = $data1['password'] ?? '';


                    if ((empty($username)) || empty($password)) {
                        echo json_encode(['error' => 'All fields are required']);
                        break;
                    }

                    $data=$this->select_where("users",$username, 'username');
                
                    if ($data->num_rows > 0) {
                        $row = $data->fetch_assoc();
                        if ($row['password'] == $password) {
                            $id = $row['id'];
                                echo json_encode([
                                'success' => true,
                                'message' => 'Login successful',
                                'token' => $id  // Sending the ID as the token
                            ]);
                        } else {
                            echo json_encode(['error' => 'Invalid password']);
                        }
                    } else {
                        echo json_encode(['error' => 'Invalid username']);
                    }
                break;

                case '/requestBlood':
                    $jsonData = file_get_contents('php://input');
    
                    // Decode the JSON data into a PHP array
                    $data1 = json_decode($jsonData, true);
    
                    if ($data1 === null) {
                        echo json_encode(['error' => 'Invalid JSON data']);
                        break;
                    }
    
                    $name = $data1['name'] ?? '';
                    $contact = $data1['contact'] ?? '';
                    $blood_type = $data1['bloodGroup'] ?? '';
                    $quantity = $data1['quantity'] ?? '';
                    if ((empty($name)) || empty($contact) || empty($blood_type) || empty($quantity)) {
                        echo json_encode(['error' => 'All fields are required']);
                        break;
                    }

                    $data=$this->select_where("available_blood", $blood_type, 'blood_type');
                    $row = $data->fetch_assoc();
                    $blood_typ_db = $row['blood_type'];
                    $quantity_db = $row['quantity'];

                    if($quantity_db < $quantity){
                        echo json_encode(['error' => 'Not enough blood available','quantity' => $quantity_db,]);
                        break;
                    }
                    else{

                        $sql = "INSERT INTO request (name, contact, blood_type, quantity) VALUES ('$name', '$contact', '$blood_type', '$quantity')";
                        $data = $this->insert($sql);
                        
                        if ($data != NULL) {
                            $updateSql = "UPDATE available_blood SET quantity = quantity - $quantity WHERE blood_type = '$blood_type'";
                            $updateData = $this->update($updateSql);
                        
                            if ($updateData != NULL) {
                                echo json_encode(['success' => true, 'message' => 'Blood requested successfully']);
                            } else {
                                echo json_encode(['error' => 'Failed to update available blood quantity']);
                            }
                        } else {
                            echo json_encode(['error' => 'Failed to request blood']);
                        }
                        break; 
                    }




                    $data =json_encode($data->fetch_all(MYSQLI_ASSOC));
                    echo $data;
                    break;

            default:
                # code...
                break;
        }
    }
}

$obj = new control;

?>