<?php

namespace App\Repository;

use App\Entity\ApplicationName;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ApplicationName|null find($id, $lockMode = null, $lockVersion = null)
 * @method ApplicationName|null findOneBy(array $criteria, array $orderBy = null)
 * @method ApplicationName[]    findAll()
 * @method ApplicationName[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ApplicationNameRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ApplicationName::class);
    }

    // /**
    //  * @return ApplicationName[] Returns an array of ApplicationName objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ApplicationName
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    public function transform(ApplicationName $applicationName)
    {
        return [
            'id'    => (int) $applicationName->getId(),
            'libelle' => (string) $applicationName->getLibelle(),
        ];
    }

    public function transformAll()
    {
        $AppsName = $this->findAll();
        $AppsNameArray = [];

        foreach ($AppsName as $AppName) {
            $AppsNameArray[] = $this->transform($AppName);
        }
        return $AppsNameArray;
    }
}
