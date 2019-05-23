<?php
namespace App\Controller;

use App\Entity\Ticket;
use App\Repository\TicketRepository;
use App\Entity\ApplicationName;
use App\Repository\ApplicationNameRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class ApplicationNameController extends ApiController
{
    /**
    * @Route("/applicationName", methods="GET")
    */
    public function index(ApplicationNameRepository $applicationNameRepository)
    {
        $appsName = $applicationNameRepository->transformAll();

        return $this->respond($appsName);
    }

    /**
    * @Route("/removeApplicationName/{id}", methods="POST")
    */
    public function removeApplicationName($id, EntityManagerInterface $em, ApplicationNameRepository $applicationNameRepository, TicketRepository $ticketRepository)
    {
        $appName = $applicationNameRepository->find($id);
        $saveLibelle = $appName->getLibelle();

        if (! $appName) {
            return $this->respondNotFound();
        }

        $em->remove($appName);
        $em->flush();

        $appName = $ticketRepository->transformAll2();

        foreach($appName as $a)
        {
            if ($a->getCategory() === $saveLibelle)
            {
                $a->setCategory("Autre");
                $em->persist($a);
                $em->flush();
            }
        }

        $appName = $applicationNameRepository->transformAll();
        return $this->respond($appName);
    }

    /**
    * @Route("/addApplicationName", methods="POST")
    */
    public function create(Request $request, ApplicationNameRepository $applicationNameRepository, EntityManagerInterface $em)
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
        $appName = new ApplicationName;
        $appName->setLibelle($request->get('libelle'));
        $em->persist($appName);
        $em->flush();

        return $this->respondCreated($applicationNameRepository->transform($appName));
    }

    /**
    * @Route("/editApplicationName/{id}/{newLibelle}", methods="POST")
    */
    public function editApplicationName($id, $newLibelle, EntityManagerInterface $em, ApplicationNameRepository $applicationNameRepository)
    {
        $appName = $applicationNameRepository->find($id);

        if (! $appName) {
            return $this->respondNotFound();
        }

        $appName->setLibelle($newLibelle);
        $em->persist($appName);
        $em->flush();

        return $this->respond([
            'libelle' => $appName->getLibelle()
        ]);
    }
}