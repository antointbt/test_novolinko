<?php
namespace App\Controller;

use App\Entity\Ticket;
use App\Repository\TicketRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class TicketController extends ApiController
{
    /**
    * @Route("/tickets", methods="GET")
    */
    public function index(TicketRepository $ticketRepository)
    {
        $tickets = $ticketRepository->transformAll();

        return $this->respond($tickets);
    }

    /**
    * @Route("/tickets", methods="POST")
    */
    public function create(Request $request, TicketRepository $ticketRepository, EntityManagerInterface $em)
    {
        $request = $this->transformJsonBody($request);

        if (! $request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        // validate the title
        if (! $request->get('title')) {
            return $this->respondValidationError('Please provide a title!');
        }

        // persist the new ticket
        $ticket = new Ticket;
        $ticket->setTitle($request->get('title'));
        $em->persist($ticket);
        $em->flush();

        return $this->respondCreated($ticketRepository->transform($ticket));
    }
}
