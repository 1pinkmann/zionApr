<?php
	$headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: <no-reply@zionauto.sg>' . "\r\n";

        mail('edwin@zionauto.sg', "New inquiry submission at Zion Auto Gallery", "Testing email for zionauto.sg", $headers);
mail('gaurangc2015@gmail.com', "New inquiry submission at Zion Auto Gallery", "Testing email for zionauto.sg", $headers);
