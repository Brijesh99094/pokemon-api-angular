import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PokemonModel } from '../model/pokemon.model';
import { NotificationService } from './../services/notification/notification.service';
import { PokemonService } from './../services/pokemon.service';

@Component({
  selector: 'app-add-pokemon-modal',
  templateUrl: './add-pokemon-modal.component.html',
  styleUrls: ['./add-pokemon-modal.component.css'],
})
export class AddPokemonModalComponent implements OnInit {
  addPokemonFormModal: NgbModalRef | null;
  pokemonForm: FormGroup;
  @Output() addItemOnSave: EventEmitter<PokemonModel>;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private pokemonService: PokemonService
  ) {
    this.addPokemonFormModal = null;
    this.pokemonForm = this.fb.group({});
    this.addItemOnSave = new EventEmitter<PokemonModel>();
  }

  ngOnInit(): void {
    this.pokemonForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      id: new FormControl(0, [Validators.required]),
      power: new FormControl('', [Validators.required]),
    });
  }

  clearForm() {
    this.Name.setValue('');
    this.Power.setValue('');
    this.Id.setValue(0);
  }

  getImageId(id: number): string {
    if (id < 10) return '00' + id;
    else if (id < 100) return '0' + id;
    else return String(id);
  }

  addPokemon() {
    const pokemon: PokemonModel = {
      id: this.Id.value,
      name: this.Name.value,
      power: this.Power.value,
      imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.getImageId(
        this.Id.value
      )}.png`,
    };

    const addPokemonApiResponseHandler = (addedPokemon: PokemonModel) => {
      this.addItemOnSave.emit(addedPokemon);
      this.notificationService.showNotification(
        'success',
        `Pokemon ${addedPokemon.name} is added`
      );
    };
    const addPokemonApiErrorHandler = (error: Error) => {
      this.notificationService.showNotification(
        'error',
        error.message || 'Error Occured'
      );
    };

    this.pokemonService.postPokemons(pokemon).subscribe({
      next: addPokemonApiResponseHandler.bind(this),
      error: addPokemonApiErrorHandler.bind(this),
      complete: () => {
        this.clearForm();
        this.closeAddPoekmonFormModal();
      },
    });
  }

  public get Name(): FormControl {
    return this.pokemonForm.get('name') as FormControl;
  }

  public get Power(): FormControl {
    return this.pokemonForm.get('power') as FormControl;
  }

  public get Id(): FormControl {
    return this.pokemonForm.get('id') as FormControl;
  }

  protected openAddPokemonFormModal(content: TemplateRef<any>) {
    this.addPokemonFormModal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
  protected closeAddPoekmonFormModal() {
    if (this.addPokemonFormModal) {
      this.addPokemonFormModal.close();
    }
  }
}
