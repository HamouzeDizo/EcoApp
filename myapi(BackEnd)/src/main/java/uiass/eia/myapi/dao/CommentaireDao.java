package uiass.eia.myapi.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uiass.eia.myapi.model.Commentaire;
import uiass.eia.myapi.service.ServiceMetierImp;

import java.util.List;
@Component
public class CommentaireDao implements ICommentaire{
    @Autowired
    private ServiceMetierImp serviceMetierImp;
    @Override
    public List<Commentaire> getAllComments() {
        return serviceMetierImp.getAllComments();
    }
}
