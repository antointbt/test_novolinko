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

}