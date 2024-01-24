package uiass.eia.myapi.dao;

import org.springframework.data.repository.CrudRepository;
import uiass.eia.myapi.model.DetailCommande;

import java.util.List;

public interface DetailCommandeRepository extends CrudRepository<DetailCommande,Long> {
    List<DetailCommande> findAllByIdCommande(long idCommande);
    List<DetailCommande> findAll();
    @Override
    void deleteById(Long id);
}
