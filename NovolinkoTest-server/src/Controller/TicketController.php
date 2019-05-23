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
    * @Route("/getStatsTickets", methods="GET")
    */
    public function getStatsTickets(TicketRepository $ticketRepository, EntityManagerInterface $em)
    {
        $nbOpenTicket = $ticketRepository->findNbOpenTicket();
        $nbProcessingTicket = $ticketRepository->findNbProcessingTicket();
        $nbUrgentPriority = $ticketRepository->findNbUrgentPriority();
        $nbHightPriority = $ticketRepository->findNbHightPriority();
        return $this->respond([$nbOpenTicket, $nbProcessingTicket, $nbUrgentPriority, $nbHightPriority, 0]);
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

        // validate the libelle
        if (! $request->get('libelle')) {
            return $this->respondValidationError('Please provide a libelle !');
        }

        // persist the new ticket
        $ticket = new Ticket;
        $ticket->setLibelle($request->get('libelle'));
        $ticket->setDescription($request->get('description'));
        $ticket->setCategory($request->get('category'));
        $ticket->setImage($request->get('image'));
        $ticket->setEmail($request->get('email'));
        $ticket->setCreationDate($request->get('creationDate'));
        $ticket->setPriority($request->get('priority'));
        $ticket->setStatus($request->get('status'));
        $em->persist($ticket);
        $em->flush();

        return $this->respondCreated($ticketRepository->transform($ticket));
    }

    /**
    * @Route("/processTicket/{id}/process", methods="POST")
    */
    public function processTicket($id, EntityManagerInterface $em, TicketRepository $ticketRepository)
    {
        $ticket = $ticketRepository->find($id);

        if (! $ticket) {
            return $this->respondNotFound();
        }

        $ticket->setStatus("processing");
        $em->persist($ticket);
        $em->flush();

        return $this->respond([
            'status' => $ticket->getStatus()
        ]);
    }

    /**
    * @Route("/closeTicket/{id}/close", methods="POST")
    */
    public function closeTicket($id, EntityManagerInterface $em, TicketRepository $ticketRepository)
    {
        $ticket = $ticketRepository->find($id);

        if (! $ticket) {
            return $this->respondNotFound();
        }

        $ticket->setStatus("close");
        $em->persist($ticket);
        $em->flush();

        return $this->respond([
            'status' => $ticket->getStatus()
        ]);
    }

    /**
    * @Route("/removeTicket/{id}", methods="POST")
    */
    public function removeTicket($id, EntityManagerInterface $em, TicketRepository $ticketRepository)
    {
        $ticket = $ticketRepository->find($id);

        if (! $ticket) {
            return $this->respondNotFound();
        }

        $em->remove($ticket);
        $em->flush();

        $tickets = $ticketRepository->transformAll();
        return $this->respond($tickets);
    }

    // /**
    // * @Route("/tickets/{id}/count", methods="POST")
    // */
    // public function increaseCount($id, EntityManagerInterface $em, TiketRepository $ticketRepository)
    // {
    //     $ticket = $ticketRepository->find($id);

    //     if (! $ticket) {
    //         return $this->respondNotFound();
    //     }

    //     $ticket->setCount($ticket->getCount() + 1);
    //     $em->persist($ticket);
    //     $em->flush();

    //     return $this->respond([
    //         'count' => $ticket->getCount()
    //     ]);
    // }
}