package uiass.eia.myapi.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import uiass.eia.myapi.dao.ClientDao;
import uiass.eia.myapi.model.Client;
import uiass.eia.myapi.service.IServiceMetier;
import uiass.eia.myapi.service.ServiceMetierImp;

@Controller
public class WebController {
    @Autowired
    private ClientDao clientDao;
    @Autowired
    private IServiceMetier serviceMetier;




}
