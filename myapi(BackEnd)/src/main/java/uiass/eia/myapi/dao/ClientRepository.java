package uiass.eia.myapi.dao;

import org.springframework.data.repository.CrudRepository;
import uiass.eia.myapi.model.Client;

import java.util.List;

public interface ClientRepository extends CrudRepository<Client,Long> {
    Client findClientByEmail(String email);
    Client findClientByNomAndPrenom(String nom,String prenom);
    Client findClientByEmailAndPassword(String email, String passowrd);
    Client findById(long id);
    List<Client> findAll();
    @Override
    void deleteById(Long id);

}
