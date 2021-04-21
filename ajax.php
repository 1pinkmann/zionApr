
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if (isset($_POST['submit']) && $_POST['submit'] == 'Book Now') {
    $data = $_POST;

    $emailcontent = file_get_contents('email/enquiry.html');

    $emailcontent = str_replace(array(
        '{first_name}',
        '{last_name}',
        '{email}',
        '{phone}',
        '{enquiry_type}'
    ),
        array(
            $data['first_name'],
            $data['last_name'],
            $data['email'],
            $data['phone'],
            $data['enquiry_type']
        ), $emailcontent);

    $carModel = isset($data['car_model']) ? "<p>Car Model: ".$data['car_model']."</p>" : '';

    $emailcontent = str_replace('{car_model}', $carModel, $emailcontent);

    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'zionautogallerysg@gmail.com';
    $mail->Password = 'imadnwggsnqxoqcm';
    $mail->Port = 587;

    $mail->setFrom('no-reply@zionauto.sg', 'Zion Auto');
    $mail->addAddress('edwin@zionauto.sg');
    $mail->addCC('sales@zionauto.sg');
    // $mail->addCC('cc@example.com'); <- FOR CC OTHERS
    $mail->addReplyTo('no-reply@zionauto.sg', 'Zion Auto');
    $mail->isHTML(true);
    $mail->Subject = 'New inquiry submission at Zion Auto Gallery';
    $mail->Body = $emailcontent;
    $mail->send();


//    $headers = "MIME-Version: 1.0" . "\r\n";
//    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
//    $headers .= 'From: <no-reply@zionauto.sg>' . "\r\n";
//
//    // mail('edwin@zionauto.sg', "New inquiry submission at Zion Auto Gallery", $emailcontent, $headers);
//    mail('edwin@zionauto.sg', "New inquiry submission at Zion Auto Gallery", $emailcontent, $headers);

    echo json_encode(array('success' => true));
}