<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TicketController
{
    /**
    * @Route("/tickets")
    */
    public function ticketAction()
    {
        return new JsonResponse([
            [
                'libelle' => 'libelle',
                'id' => 0
            ]
        ]);
    }
}