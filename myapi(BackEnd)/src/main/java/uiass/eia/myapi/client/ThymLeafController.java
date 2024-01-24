package uiass.eia.myapi.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import uiass.eia.myapi.dao.ClientDao;
import uiass.eia.myapi.model.Client;
import uiass.eia.myapi.model.Commande;
import uiass.eia.myapi.model.DetailCommande;
import uiass.eia.myapi.service.IServiceMetier;

import java.util.List;

@Controller
@RequestMapping(path = "/thymleaf")
public class ThymLeafController {
    @Autowired
    private ClientDao clientDao;
    @Autowired
    private IServiceMetier service;
    @GetMapping("/clients")
    public String showView(Model model){
        List<Client> clients = clientDao.getAllClients();
        model.addAttribute("clientList", clients);
        return "clients";
    }

    @GetMapping("/commandes/{id}")
    public String showCommandes(Model model,@PathVariable long id){
        System.out.println("id: "+id);
        List<Commande> commandes=service.getAllCommandeByClient(id);
        System.out.println(commandes);
        model.addAttribute("commandeList", commandes);
        return "commandes";
    }
    @GetMapping("/detailCommandes/{id}")
    public String showDeatilCommandes(Model model,@PathVariable long id){
        List<DetailCommande> detailCommandes=service.getAllDetailCommandeByCommande(id);
        model.addAttribute("detailCommandeList", detailCommandes);
        return "detailCommande";
    }
    @RequestMapping( path = "/delete/{id}",method = {RequestMethod.GET,RequestMethod.DELETE})
    public String deleteClient(Model model,@PathVariable(value = "id") long id){
        this.service.deleteClient(id);
        return "redirect:/thymleaf/clients";
    }

    @RequestMapping( path = "/commande/delete/{idUser}/{id}",method = {RequestMethod.GET,RequestMethod.DELETE})
    public String deleteCommande(Model model,@PathVariable(value = "id") long id,@PathVariable(value = "idUser") long idUser){
        this.service.deleteCommande(id);
        return "redirect:/thymleaf/commandes/{idUser}";
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.GET)
    public String testX(Model model,@PathVariable long id) {
        Client client=service.getById(id);
        model.addAttribute("client",client);
        return "update";
    }

    @RequestMapping(path="/updateUser/{id}", method = {RequestMethod.GET,RequestMethod.POST})
    public String submitUpdateForm(@ModelAttribute Client client,@PathVariable long id){
        service.updateUser(
                id, client.getNom(), client.getPrenom(),client.getAge(), client.getEmail(), client.getPassword()
        );
        return "redirect:/thymleaf/clients";
    }


}
